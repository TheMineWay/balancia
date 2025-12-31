import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { BUDGET_MAX_SEGMENTS_PER_BUDGET } from "@shared/constants";
import type {
	BudgetModel,
	BudgetSegmentCreateModel,
	BudgetSegmentImputationCreateModel,
	BudgetSegmentImputationModel,
	BudgetSegmentImputationWithTransactionModel,
	BudgetSegmentModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionFiltersModel,
	TransactionModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	BudgetSegmentCreatedEvent,
	BudgetSegmentDeletedEvent,
	BudgetSegmentImputationCreatedEvent,
	BudgetSegmentImputationDeletedEvent,
	BudgetSegmentImputationUpdatedEvent,
	BudgetSegmentUpdatedEvent,
} from "src/features/budgets/segments/budget-segments.events";
import { BudgetSegmentImputationsRepository } from "src/features/budgets/segments/repositories/budget-segment-imputations.repository";
import { BudgetSegmentsRepository } from "src/features/budgets/segments/repositories/budget-segments.repository";

@Injectable()
export class BudgetSegmentsService {
	constructor(
		private readonly budgetSegmentsRepository: BudgetSegmentsRepository,
		private readonly budgetSegmentImputationsRepository: BudgetSegmentImputationsRepository,
		private readonly eventService: EventService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	// #region CRUD

	async create(
		data: BudgetSegmentCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentModel | null> {
		return await (options?.transaction ?? this.databaseService.db).transaction(
			async (transaction) => {
				// Check if budget has reached segments limit
				if (
					await this.hasBudgetReachedSegmentsLimit(data.budgetId, {
						transaction,
					})
				) {
					throw new BadRequestException();
				}

				const created = await this.budgetSegmentsRepository.create(data, {
					transaction,
				});

				// Ensure total percent does not exceed 100%
				if (
					(await this.getTotalPercentByBudgetId(data.budgetId, {
						transaction,
					})) > 100
				) {
					throw new BadRequestException();
				}

				if (created)
					this.eventService.emit(
						new BudgetSegmentCreatedEvent({ budgetSegment: created }),
					);

				return created;
			},
		);
	}

	async updateById(
		segmentId: BudgetSegmentModel["id"],
		data: Partial<BudgetSegmentCreateModel>,
		options?: QueryOptions,
	): Promise<BudgetSegmentModel | null> {
		return await (options?.transaction ?? this.databaseService.db).transaction(
			async (transaction) => {
				const updated = await this.budgetSegmentsRepository.updateById(
					segmentId,
					data,
					{ transaction },
				);
				if (!updated) return null;

				// Ensure total percent does not exceed 100%
				if (
					(await this.getTotalPercentByBudgetId(updated.budgetId, {
						transaction,
					})) > 100
				) {
					throw new BadRequestException();
				}

				if (updated)
					this.eventService.emit(
						new BudgetSegmentUpdatedEvent({ budgetSegment: updated }),
					);

				return updated;
			},
		);
	}

	async deleteById(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.budgetSegmentsRepository.deleteById(segmentId, options);

		this.eventService.emit(new BudgetSegmentDeletedEvent({ segmentId }));
	}

	// #endregion

	// #region Stats

	async getTotalPercentByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<number> {
		return await this.budgetSegmentsRepository.getTotalPercentByBudgetId(
			budgetId,
			options,
		);
	}

	// #endregion

	// #region Imputations

	async listImputationsBySegmentId(
		segmentId: BudgetSegmentModel["id"],
		search: PaginatedSearchModel,
		filters?: TransactionFiltersModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<BudgetSegmentImputationWithTransactionModel>> {
		return await this.budgetSegmentsRepository.paginatedImputationsBySegmentId(
			segmentId,
			search,
			filters,
			options,
		);
	}

	async impute(
		impute: BudgetSegmentImputationCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationModel | null> {
		const created = await this.budgetSegmentImputationsRepository.create(
			impute,
			options,
		);

		if (created)
			this.eventService.emit(
				new BudgetSegmentImputationCreatedEvent({ imputation: created }),
			);

		return created;
	}

	async updateImputation(
		imputationId: BudgetSegmentImputationModel["id"],
		data: Partial<BudgetSegmentImputationCreateModel>,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationModel | null> {
		const updated = await this.budgetSegmentImputationsRepository.updateById(
			imputationId,
			data,
			options,
		);

		if (updated)
			this.eventService.emit(
				new BudgetSegmentImputationUpdatedEvent({ imputation: updated }),
			);

		return updated;
	}

	async removeImputation(
		imputationId: BudgetSegmentImputationModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.budgetSegmentImputationsRepository.deleteById(
			imputationId,
			options,
		);

		this.eventService.emit(
			new BudgetSegmentImputationDeletedEvent({ imputationId }),
		);
	}

	// #endregion

	// #region Stats

	async getAvailabilityStatsBySegmentAndTransaction(
		segmentId: BudgetSegmentModel["id"],
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		const segment = await this.budgetSegmentsRepository.findById(
			segmentId,
			options,
		);
		if (!segment) throw new NotFoundException();

		// Get total imputation percent for the transaction
		const { totalPercent: totalImputationPercent } =
			await this.budgetSegmentImputationsRepository.getImputationPercentByBudgetAndTransaction(
				segment.budgetId,
				transactionId,
				options,
			);

		// Check if there is already an imputation for this segment and transaction
		const segmentImputation =
			await this.budgetSegmentImputationsRepository.findByTransactionIdAndSegmentId(
				transactionId,
				segmentId,
				options,
			);
		const alreadyImputed = Boolean(segmentImputation);

		return {
			totalImputationPercent,
			alreadyImputed,
		};
	}

	// #endregion

	// #region Checks

	async hasBudgetReachedSegmentsLimit(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	) {
		const segmentsCount = await this.budgetSegmentsRepository.countByBudgetId(
			budgetId,
			options,
		);

		return segmentsCount >= BUDGET_MAX_SEGMENTS_PER_BUDGET;
	}

	// #endregion
}
