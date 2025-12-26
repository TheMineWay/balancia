import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { BUDGET_MAX_SEGMENTS_PER_BUDGET } from "@shared/constants";
import type {
	BudgetModel,
	BudgetSegmentCreateModel,
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
	BudgetSegmentUpdatedEvent,
} from "src/features/budgets/segments/budget-segments.events";
import { BudgetSegmentsRepository } from "src/features/budgets/segments/repositories/budget-segments.repository";

@Injectable()
export class BudgetSegmentsService {
	constructor(
		private readonly budgetSegmentsRepository: BudgetSegmentsRepository,
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

	// #region Transactions

	async listTransactionsBySegmentId(
		segmentId: BudgetSegmentModel["id"],
		search: PaginatedSearchModel,
		filters?: TransactionFiltersModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<TransactionModel>> {
		return await this.budgetSegmentsRepository.paginatedTransactionsBySegmentId(
			segmentId,
			search,
			filters,
			options,
		);
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
