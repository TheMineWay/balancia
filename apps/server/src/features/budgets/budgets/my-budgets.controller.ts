import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import {
	Controller,
	InternalServerErrorException,
	NotFoundException,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import {
	getController,
	getParamName,
	type InferBodyDto,
	type InferQueryDto,
	type InferResponseDto,
	MY_BUDGET_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { UserBudgetsService } from "src/features/budgets/budgets/user-budgets.service";

@Controller(getController(MY_BUDGET_CONTROLLER_DEFINITION, {}))
export class MyBudgetsController {
	constructor(private readonly userBudgetsService: UserBudgetsService) {}

	@Endpoint(MY_BUDGET_CONTROLLER_DEFINITION, "getList")
	async getList(
		@UserId() userId: UserModelId,
		@ValidatedQuery(MY_BUDGET_CONTROLLER_DEFINITION, "getList")
		{
			filters,
			...search
		}: InferQueryDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "getList">,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "getList">
	> {
		return this.userBudgetsService.getList(userId, search, filters);
	}

	@Endpoint(MY_BUDGET_CONTROLLER_DEFINITION, "get")
	async get(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_BUDGET_CONTROLLER_DEFINITION, "get", "budgetId"),
			ParseIntPipe,
		)
		budgetId: number,
	): Promise<InferResponseDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "get">> {
		const budget = await this.userBudgetsService.getById(userId, budgetId);
		if (!budget) throw new NotFoundException();
		return budget;
	}

	@Endpoint(MY_BUDGET_CONTROLLER_DEFINITION, "create")
	async create(
		@UserId() userId: UserModelId,
		@ValidatedBody(MY_BUDGET_CONTROLLER_DEFINITION, "create")
		body: InferBodyDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "create">,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "create">
	> {
		const created = await this.userBudgetsService.create(userId, body);
		if (!created) throw new InternalServerErrorException();
		return created;
	}

	@Endpoint(MY_BUDGET_CONTROLLER_DEFINITION, "update")
	async update(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_BUDGET_CONTROLLER_DEFINITION, "update", "budgetId"),
			ParseIntPipe,
		)
		budgetId: number,
		@ValidatedBody(MY_BUDGET_CONTROLLER_DEFINITION, "update")
		body: InferBodyDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "update">,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "update">
	> {
		const updated = await this.userBudgetsService.update(
			userId,
			budgetId,
			body,
		);
		if (!updated) throw new InternalServerErrorException();
		return updated;
	}

	@Endpoint(MY_BUDGET_CONTROLLER_DEFINITION, "delete")
	async delete(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_BUDGET_CONTROLLER_DEFINITION, "delete", "budgetId"),
			ParseIntPipe,
		)
		budgetId: number,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_CONTROLLER_DEFINITION, "delete">
	> {
		await this.userBudgetsService.delete(userId, budgetId);
	}
}
