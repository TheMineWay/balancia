import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { BudgetSegmentImputationInsert } from "@database/schemas/main/tables/budget/budget-segment-imputation.table";
import { DatabaseService } from "@database/services/database.service";
import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import type {
	BudgetSegmentCategoryAutoMatcherCreateModel,
	BudgetSegmentCategoryAutoMatcherModel,
	BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel,
	TransactionModel,
} from "@shared/models";
import { groupBy } from "lodash";
import { EventService } from "src/events/event.service";
import {
	BudgetSegmentCategoryAutoMatcherCreatedEvent,
	BudgetSegmentCategoryAutoMatcherDeletedEvent,
} from "src/features/budgets/automations/budget-segment-automations.events";
import { BudgetSegmentCategoryAutoMatcherRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-matcher.repository";
import { BudgetImputationService } from "src/features/budgets/imputations/budget-imputation.service";
import {
	TransactionCreatedEvent,
	TransactionUpdatedEvent,
} from "src/features/finances/transactions/transactions.events";

@Injectable()
export class BudgetSegmentAutomationsService {
	constructor(
		private readonly budgetSegmentCategoryAutoMatcherRepository: BudgetSegmentCategoryAutoMatcherRepository,
		private readonly budgetImputationService: BudgetImputationService,
		private readonly eventService: EventService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	// #region CRUD

	async createSegmentCategoryMatcher(
		matcher: BudgetSegmentCategoryAutoMatcherCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentCategoryAutoMatcherModel | null> {
		// Check if the segment category can be assigned
		const canAssign = await this.checkSegmentCategoryCanBeAssigned(
			matcher.segmentId,
			matcher.categoryId,
			options,
		);

		if (!canAssign) {
			throw new BadRequestException(
				"This category cannot be assigned to this segment",
			);
		}

		const created =
			await this.budgetSegmentCategoryAutoMatcherRepository.create(
				matcher,
				options,
			);

		if (created)
			this.eventService.emit(
				new BudgetSegmentCategoryAutoMatcherCreatedEvent({ matcher: created }),
			);

		return created;
	}

	async deleteSegmentCategoryMatcher(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		categoryId: BudgetSegmentCategoryAutoMatcherModel["categoryId"],
		options?: QueryOptions,
	): Promise<void> {
		await this.budgetSegmentCategoryAutoMatcherRepository.deleteBySegmentAndCategory(
			segmentId,
			categoryId,
			options,
		);

		this.eventService.emit(
			new BudgetSegmentCategoryAutoMatcherDeletedEvent({
				segmentId,
				categoryId,
			}),
		);
	}

	// #endregion

	// #region Checks

	async checkSegmentCategoryCanBeAssigned(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		categoryId: BudgetSegmentCategoryAutoMatcherModel["categoryId"],
		options?: QueryOptions,
	): Promise<boolean> {
		const budget =
			await this.budgetSegmentCategoryAutoMatcherRepository.findBudgetBySegmentId(
				segmentId,
				options,
			);
		if (!budget) throw new NotFoundException();

		const count =
			await this.budgetSegmentCategoryAutoMatcherRepository.countBudgetsAutomatcherCategoriesByBudgetAndCategory(
				budget.id,
				categoryId,
				options,
			);
		return count === 0;
	}

	// #endregion

	// #region Auto matchers

	async runAutoMatchersBySegments(
		segmentIds: BudgetSegmentCategoryAutoMatcherModel["segmentId"][],
		filters?: BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel & {
			transactionIds?: TransactionModel["id"][];
		},
		options?: QueryOptions,
	): Promise<void> {
		let hasMore = true;
		do {
			const transactions =
				await this.budgetSegmentCategoryAutoMatcherRepository.findPendingAutoImputableTransactionsBySegmentIds(
					segmentIds,
					filters,
					options,
				);

			// Check if there are more pending transaction
			if (transactions.length === 0) {
				hasMore = false;
				continue;
			}

			// Impute transactions
			const segmentGroups = groupBy(transactions, (t) => t.segmentId);
			for (const [rawSegmentId, transactions] of Object.entries(
				segmentGroups,
			)) {
				const segmentId = +rawSegmentId;

				// Impute transactions to the segment
				const imputations: BudgetSegmentImputationInsert[] = transactions.map(
					(t) => ({
						segmentId,
						transactionId: t.transactionId,
					}),
				);
				await this.budgetImputationService.bulkImpute(imputations, options);
			}
		} while (hasMore);
	}

	private async triggerTransactionAutoMatching(transaction: TransactionModel) {
		const categoryId = transaction.categoryId;
		if (!categoryId) return;

		// Auto impute if it has category
		await this.databaseService.db.transaction(async (tx) => {
			const details =
				await this.budgetSegmentCategoryAutoMatcherRepository.findAutoImputationDetailsByCategoryId(
					categoryId,
					{ transaction: tx },
				);
			await this.runAutoMatchersBySegments(
				details.map((d) => d.segmentId),
				{
					transactionIds: [transaction.id],
				},
				{ transaction: tx },
			);
		});
	}

	// #endregion

	// #region Events

	@OnEvent(TransactionCreatedEvent.NAME)
	protected handleTransactionCreated(event: TransactionCreatedEvent) {
		this.triggerTransactionAutoMatching(event.payload.transaction);
	}

	@OnEvent(TransactionUpdatedEvent.NAME)
	protected handleTransactionUpdated(event: TransactionUpdatedEvent) {
		this.triggerTransactionAutoMatching(event.payload.transaction);
	}

	// #endregion
}
