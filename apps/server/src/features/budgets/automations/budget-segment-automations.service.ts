import type { QueryOptions } from "@database/repository/repository";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
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

	async runSegmentAutoMatchers(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		options?: QueryOptions,
	): Promise<void> {
		const automatchers =
			await this.budgetSegmentCategoryAutoMatcherRepository.findBySegmentId(
				segmentId,
				options,
			);
		for (const automatcher of automatchers) {
			console.log({ automatcher });
		}
	}
}
