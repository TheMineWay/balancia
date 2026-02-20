import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import {
	Controller,
	InternalServerErrorException,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import {
	getController,
	getParamName,
	InferBodyDto,
	InferQueryDto,
	type InferResponseDto,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { UserBudgetSegmentAutomationsService } from "src/features/budgets/automations/user-budget-segment-automations.service";

@Controller(getController(MY_BUDGET_AUTOMATIONS_CONTROLLER, {}))
export class MyBudgetAutomationsController {
	constructor(
		private readonly userBudgetSegmentAutomationsService: UserBudgetSegmentAutomationsService,
	) {}

	// #region Segment Category Matchers
	@Endpoint(MY_BUDGET_AUTOMATIONS_CONTROLLER, "createSegmentCategoryMatcher")
	async createSegmentCategoryMatcher(
		@UserId() userId: UserModelId,
		@ValidatedBody(
			MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"createSegmentCategoryMatcher",
		)
		body: InferBodyDto<
			typeof MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"createSegmentCategoryMatcher"
		>,
	): Promise<
		InferResponseDto<
			typeof MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"createSegmentCategoryMatcher"
		>
	> {
		const created =
			await this.userBudgetSegmentAutomationsService.createSegmentCategoryMatcher(
				userId,
				body,
			);

		if (!created) throw new InternalServerErrorException();

		return created;
	}

	@Endpoint(MY_BUDGET_AUTOMATIONS_CONTROLLER, "getSegmentCategoryMatchersList")
	async getSegmentCategoryMatchers(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"getSegmentCategoryMatchersList",
				"segmentId",
			),
			ParseIntPipe,
		)
		segmentId: number,
		@ValidatedQuery(
			MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"getSegmentCategoryMatchersList",
		)
		query: InferQueryDto<
			typeof MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"getSegmentCategoryMatchersList"
		>,
	): Promise<
		InferResponseDto<
			typeof MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"getSegmentCategoryMatchersList"
		>
	> {
		return this.userBudgetSegmentAutomationsService.getSegmentCategoryMatchersList(
			userId,
			segmentId,
			query,
		);
	}

	@Endpoint(
		MY_BUDGET_AUTOMATIONS_CONTROLLER,
		"getSegmentCategoryMatcherBySegmentAndCategory",
	)
	async getSegmentCategoryMatcherBySegmentAndCategory(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"getSegmentCategoryMatcherBySegmentAndCategory",
				"segmentId",
			),
			ParseIntPipe,
		)
		segmentId: number,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"getSegmentCategoryMatcherBySegmentAndCategory",
				"categoryId",
			),
			ParseIntPipe,
		)
		categoryId: number,
	): Promise<
		InferResponseDto<
			typeof MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"getSegmentCategoryMatcherBySegmentAndCategory"
		>
	> {
		const matcher =
			await this.userBudgetSegmentAutomationsService.getSegmentCategoryMatcherBySegmentAndCategory(
				userId,
				segmentId,
				categoryId,
			);
		return { matcher };
	}

	@Endpoint(
		MY_BUDGET_AUTOMATIONS_CONTROLLER,
		"checkSegmentCategoryCanBeAssigned",
	)
	async checkSegmentCategoryCanBeAssigned(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"checkSegmentCategoryCanBeAssigned",
				"segmentId",
			),
			ParseIntPipe,
		)
		segmentId: number,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"checkSegmentCategoryCanBeAssigned",
				"categoryId",
			),
			ParseIntPipe,
		)
		categoryId: number,
	): Promise<
		InferResponseDto<
			typeof MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"checkSegmentCategoryCanBeAssigned"
		>
	> {
		const canAssign =
			await this.userBudgetSegmentAutomationsService.checkSegmentCategoryCanBeAssigned(
				userId,
				segmentId,
				categoryId,
			);
		return { canAssign };
	}

	@Endpoint(MY_BUDGET_AUTOMATIONS_CONTROLLER, "deleteSegmentCategoryMatcher")
	async deleteSegmentCategoryMatcher(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"deleteSegmentCategoryMatcher",
				"segmentId",
			),
			ParseIntPipe,
		)
		segmentId: number,
		@Param(
			getParamName(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"deleteSegmentCategoryMatcher",
				"categoryId",
			),
			ParseIntPipe,
		)
		categoryId: number,
	): Promise<void> {
		await this.userBudgetSegmentAutomationsService.deleteSegmentCategoryMatcher(
			userId,
			segmentId,
			categoryId,
		);
	}

	// #endregion
}
