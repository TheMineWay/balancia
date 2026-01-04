import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, InternalServerErrorException } from "@nestjs/common";
import {
	getController,
	InferBodyDto,
	type InferResponseDto,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
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

	// #endregion
}
