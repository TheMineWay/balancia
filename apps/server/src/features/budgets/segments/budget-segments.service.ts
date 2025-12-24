import type { QueryOptions } from "@database/repository/repository";
import { Injectable } from "@nestjs/common";
import type {
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
	) {}

	async create(
		data: BudgetSegmentCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentModel | null> {
		const created = await this.budgetSegmentsRepository.create(data, options);

		if (created)
			this.eventService.emit(
				new BudgetSegmentCreatedEvent({ budgetSegment: created }),
			);

		return created;
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
}
