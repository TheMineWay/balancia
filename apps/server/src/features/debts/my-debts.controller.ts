import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	getParamName,
	type InferBodyDto,
	type InferQueryDto,
	type InferResponseDto,
	MY_DEBTS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { DebtsService } from "src/features/debts/debts.service";

@Controller(getController(MY_DEBTS_CONTROLLER, {}))
export class MyDebtsController {
	constructor(private readonly debtsService: DebtsService) {}

	@ApiOperation({ summary: "Get paginated list of user debts" })
	@Endpoint(MY_DEBTS_CONTROLLER, "getDebts")
	async getDebtsList(
		@UserId() userId: UserModelId,
		@ValidatedQuery(MY_DEBTS_CONTROLLER, "getDebts") query: InferQueryDto<
			typeof MY_DEBTS_CONTROLLER,
			"getDebts"
		>,
	): Promise<InferResponseDto<typeof MY_DEBTS_CONTROLLER, "getDebts">> {
		return await this.debtsService.findUserDebtsList(userId, query);
	}

	@ApiOperation({ summary: "Create a new debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "createDebt")
	async createDebt(
		@UserId() userId: UserModelId,
		@ValidatedBody(MY_DEBTS_CONTROLLER, "createDebt") body: InferBodyDto<
			typeof MY_DEBTS_CONTROLLER,
			"createDebt"
		>,
	): Promise<InferResponseDto<typeof MY_DEBTS_CONTROLLER, "createDebt">> {
		await this.debtsService.create({ ...body, userId });
	}

	@ApiOperation({ summary: "Update an existing debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "updateDebt")
	async updateDebt(
		@Param(getParamName(MY_DEBTS_CONTROLLER, "updateDebt", "id"), ParseIntPipe)
		debtId: number,
		@ValidatedBody(MY_DEBTS_CONTROLLER, "updateDebt") body: InferBodyDto<
			typeof MY_DEBTS_CONTROLLER,
			"updateDebt"
		>,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_DEBTS_CONTROLLER, "updateDebt">> {
		await this.debtsService.userDebtUpdate(userId, debtId, body);
	}

	@ApiOperation({ summary: "Delete a debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "deleteDebt")
	async deleteDebt(
		@Param(
			getParamName(MY_DEBTS_CONTROLLER, "deleteDebt", "debtId"),
			ParseIntPipe,
		)
		debtId: number,
		@UserId() userId: UserModelId,
	): Promise<InferResponseDto<typeof MY_DEBTS_CONTROLLER, "deleteDebt">> {
		await this.debtsService.userDebtDelete(userId, debtId);
	}

	// Assign origin transactions

	@ApiOperation({ summary: "Assign origin transactions to a debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "assignOriginTransactions")
	async assignOriginTransactions(
		@Param(
			getParamName(MY_DEBTS_CONTROLLER, "assignOriginTransactions", "debtId"),
			ParseIntPipe,
		)
		debtId: number,
		@ValidatedBody(MY_DEBTS_CONTROLLER, "assignOriginTransactions")
		body: InferBodyDto<typeof MY_DEBTS_CONTROLLER, "assignOriginTransactions">,
		@UserId() userId: UserModelId,
	): Promise<
		InferResponseDto<typeof MY_DEBTS_CONTROLLER, "assignOriginTransactions">
	> {
		await this.debtsService.userSetOriginTransactionsToDebt(
			userId,
			debtId,
			body.transactions,
		);
	}
}
