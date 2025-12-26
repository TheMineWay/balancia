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
	type InferResponseDto,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { UserBudgetSegmentsService } from "src/features/budgets/segments/user-budget-segments.service";

@Controller(getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {}))
export class MyBudgetSegmentsController {
	constructor(
		private readonly userBudgetSegmentsService: UserBudgetSegmentsService,
	) {}

	@Endpoint(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "getByBudget")
	async getByBudget(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"getByBudget",
				"budgetId",
			),
			ParseIntPipe,
		)
		budgetId: number,
	): Promise<
		InferResponseDto<
			typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
			"getByBudget"
		>
	> {
		const segments = await this.userBudgetSegmentsService.getByBudgetId(
			userId,
			budgetId,
		);
		return { segments };
	}

	@Endpoint(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "get")
	async get(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "get", "segmentId"),
			ParseIntPipe,
		)
		segmentId: number,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "get">
	> {
		const segment = await this.userBudgetSegmentsService.getById(
			userId,
			segmentId,
		);
		if (!segment) throw new NotFoundException();
		return segment;
	}

	@Endpoint(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "create")
	async create(
		@UserId() userId: UserModelId,
		@ValidatedBody(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "create")
		body: InferBodyDto<
			typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
			"create"
		>,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "create">
	> {
		const created = await this.userBudgetSegmentsService.create(userId, body);
		if (!created) throw new InternalServerErrorException();
		return created;
	}

	@Endpoint(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "update")
	async update(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"update",
				"segmentId",
			),
			ParseIntPipe,
		)
		segmentId: number,
		@ValidatedBody(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "update")
		body: InferBodyDto<
			typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
			"update"
		>,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "update">
	> {
		const updated = await this.userBudgetSegmentsService.updateById(
			userId,
			segmentId,
			body,
		);
		if (!updated) throw new InternalServerErrorException();
		return updated;
	}

	@Endpoint(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "delete")
	async delete(
		@UserId() userId: UserModelId,
		@Param(
			getParamName(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"delete",
				"segmentId",
			),
			ParseIntPipe,
		)
		segmentId: number,
	): Promise<
		InferResponseDto<typeof MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, "delete">
	> {
		await this.userBudgetSegmentsService.deleteById(userId, segmentId);
	}
}
