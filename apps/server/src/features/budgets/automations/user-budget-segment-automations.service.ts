import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	BudgetSegmentCategoryAutoMatcherCreateModel,
	BudgetSegmentCategoryAutoMatcherModel,
	BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { BudgetSegmentAutomationsService } from "src/features/budgets/automations/budget-segment-automations.service";
import { BudgetSegmentCategoryAutoMatcherRepository } from "src/features/budgets/automations/repositories/budget-segment-category-auto-matcher.repository";
import { UserBudgetSegmentsService } from "src/features/budgets/segments/user-budget-segments.service";
import { CategoriesService } from "src/features/finances/categories/categories.service";

@Injectable()
export class UserBudgetSegmentAutomationsService {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly budgetSegmentAutomationsService: BudgetSegmentAutomationsService,
		private readonly userBudgetSegmentService: UserBudgetSegmentsService,
		private readonly categoriesService: CategoriesService,
		private readonly budgetSegmentCategoryAutoMatcherRepository: BudgetSegmentCategoryAutoMatcherRepository,
	) {}

	async createSegmentCategoryMatcher(
		userId: UserModelId,
		matcher: BudgetSegmentCategoryAutoMatcherCreateModel,
	): Promise<BudgetSegmentCategoryAutoMatcherModel | null> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const isCreationPayloadOwner = await this.isOwnerOfAutomatcher(
				userId,
				matcher,
				{ transaction },
			);

			if (!isCreationPayloadOwner) throw new UnauthorizedException();

			return await this.budgetSegmentAutomationsService.createSegmentCategoryMatcher(
				matcher,
				{ transaction },
			);
		});
	}

	// #region Ownership

	async getSegmentCategoryMatchersList(
		userId: UserModelId,
		segmentId: number,
		query: PaginatedSearchModel,
	) {
		// Ownership check for segment
		const { isOwner } = await this.userBudgetSegmentService.checkOwnership(
			userId,
			segmentId,
		);
		if (!isOwner) throw new UnauthorizedException();

		return this.budgetSegmentCategoryAutoMatcherRepository.findListBySegmentId(
			segmentId,
			query,
		);
	}

	async getSegmentCategoryMatcherBySegmentAndCategory(
		userId: UserModelId,
		segmentId: number,
		categoryId: number,
	): Promise<BudgetSegmentCategoryAutoMatcherModel | null> {
		const isOwner = await this.isOwnerOfAutomatcher(userId, {
			segmentId,
			categoryId,
		});
		if (!isOwner) throw new UnauthorizedException();

		return this.budgetSegmentCategoryAutoMatcherRepository.findBySegmentAndCategory(
			segmentId,
			categoryId,
		);
	}

	async checkSegmentCategoryCanBeAssigned(
		userId: UserModelId,
		segmentId: number,
		categoryId: number,
	): Promise<boolean> {
		const isOwner = await this.isOwnerOfAutomatcher(userId, {
			segmentId,
			categoryId,
		});
		if (!isOwner) throw new UnauthorizedException();

		return this.budgetSegmentAutomationsService.checkSegmentCategoryCanBeAssigned(
			segmentId,
			categoryId,
		);
	}

	async deleteSegmentCategoryMatcher(
		userId: UserModelId,
		segmentId: number,
		categoryId: number,
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const isOwner = await this.isOwnerOfAutomatcher(
				userId,
				{ segmentId, categoryId },
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentAutomationsService.deleteSegmentCategoryMatcher(
				segmentId,
				categoryId,
				{ transaction },
			);
		});
	}

	async runSegmentAutoMatchers(
		userId: UserModelId,
		segmentId: number,
		filters?: BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel,
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			// Check segment ownership
			const { isOwner } = await this.userBudgetSegmentService.checkOwnership(
				userId,
				segmentId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			// Call the service to run auto matchers
			await this.budgetSegmentAutomationsService.runCategoryAutoMatchersBySegments(
				[segmentId],
				filters,
				{ transaction },
			);
		});
	}

	/**
	 * Checks if the user is the owner of the creation payload
	 */
	async isOwnerOfAutomatcher(
		userId: UserModelId,
		data: BudgetSegmentCategoryAutoMatcherCreateModel,
		options?: QueryOptions,
	): Promise<boolean> {
		return await (options?.transaction ?? this.databaseService.db).transaction(
			async (transaction) => {
				// Check segment ownership
				const { isOwner: isSegmentOwner } =
					await this.userBudgetSegmentService.checkOwnership(
						userId,
						data.segmentId,
						{ transaction },
					);

				if (!isSegmentOwner) return false;

				// Check category ownership
				const { isOwner: isCategoryOwner } =
					await this.categoriesService.checkCategoryOwnership(
						userId,
						data.categoryId,
						{ transaction },
					);

				if (!isCategoryOwner) return false;

				return true;
			},
		);
	}
	// #endregion
}
