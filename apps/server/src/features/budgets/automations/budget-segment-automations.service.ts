import type { QueryOptions } from "@database/repository/repository";
import { Injectable } from "@nestjs/common";
import type {
	BudgetSegmentCategoryAutoMatcherCreateModel,
	BudgetSegmentCategoryAutoMatcherModel,
} from "@shared/models";
import { BudgetSegmentCategoryAutoMatcherRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-matcher.repository";

@Injectable()
export class BudgetSegmentAutomationsService {
	constructor(
		private readonly budgetSegmentCategoryAutoMatcherRepository: BudgetSegmentCategoryAutoMatcherRepository,
	) {}

	async createSegmentCategoryMatcher(
		matcher: BudgetSegmentCategoryAutoMatcherCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentCategoryAutoMatcherModel | null> {
		return await this.budgetSegmentCategoryAutoMatcherRepository.create(
			matcher,
			options,
		);
	}
}
