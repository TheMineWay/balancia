import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { BUDGET_MAX_SEGMENTS_PER_BUDGET } from "@shared/constants";
import type {
	BudgetModel,
	BudgetSegmentCreateModel,
	BudgetSegmentModel,
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

	async create(
		data: BudgetSegmentCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentModel | null> {
		return await (options?.transaction ?? this.databaseService.db).transaction(
			async (transaction) => {
				const created = await this.budgetSegmentsRepository.create(data, {
					transaction,
				});
				if (
					await this.hasBudgetReachedSegmentsLimit(data.budgetId, {
						transaction,
					})
				)
					throw new BadRequestException();

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
		const updated = await this.budgetSegmentsRepository.updateById(
			segmentId,
			data,
			options,
		);

		if (updated)
			this.eventService.emit(
				new BudgetSegmentUpdatedEvent({ budgetSegment: updated }),
			);

		return updated;
	}

	async deleteById(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.budgetSegmentsRepository.deleteById(segmentId, options);

		this.eventService.emit(new BudgetSegmentDeletedEvent({ segmentId }));
	}

	// #region Checks

	async hasBudgetReachedSegmentsLimit(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	) {
		const segmentsCount = await this.budgetSegmentsRepository.countyBudgetId(
			budgetId,
			options,
		);

		return segmentsCount >= BUDGET_MAX_SEGMENTS_PER_BUDGET;
	}

	// #endregion
}
