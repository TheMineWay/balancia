import type { QueryOptions } from "@database/repository/repository";
import { Injectable } from "@nestjs/common";
import type {
	BudgetSegmentCategoryAutoMatcherCreateModel,
	BudgetSegmentCategoryAutoMatcherModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	BudgetSegmentCategoryAutoMatcherCreatedEvent,
	BudgetSegmentCategoryAutoMatcherDeletedEvent,
} from "src/features/budgets/automations/budget-segment-automations.events";
import { BudgetSegmentCategoryAutoMatcherRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-matcher.repository";

@Injectable()
export class BudgetSegmentAutomationsService {
	constructor(
		private readonly budgetSegmentCategoryAutoMatcherRepository: BudgetSegmentCategoryAutoMatcherRepository,
		private readonly eventService: EventService,
	) {}

	async createSegmentCategoryMatcher(
		matcher: BudgetSegmentCategoryAutoMatcherCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentCategoryAutoMatcherModel | null> {
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
}
