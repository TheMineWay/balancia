import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	BudgetSegmentCategoryAutoMatcherCreateModel,
	BudgetSegmentCategoryAutoMatcherModel,
	UserModelId,
} from "@shared/models";
import { BudgetSegmentAutomationsService } from "src/features/budgets/automations/budget-segment-automations.service";
import { UserBudgetSegmentsService } from "src/features/budgets/segments/user-budget-segments.service";
import { CategoriesService } from "src/features/finances/categories/categories.service";

@Injectable()
export class UserBudgetSegmentAutomationsService {
	constructor(
		private readonly budgetSegmentAutomationsService: BudgetSegmentAutomationsService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly userBudgetSegmentService: UserBudgetSegmentsService,
		private readonly categoriesService: CategoriesService,
	) {}

	async createSegmentCategoryMatcher(
		userId: UserModelId,
		matcher: BudgetSegmentCategoryAutoMatcherCreateModel,
	): Promise<BudgetSegmentCategoryAutoMatcherModel | null> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const isCreationPayloadOwner = await this.isOwnerOfCreationPayload(
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

	/**
	 * Checks if the user is the owner of the creation payload
	 */
	async isOwnerOfCreationPayload(
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
