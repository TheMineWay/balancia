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
import { DebtOriginService } from "src/features/debts/debt-origin.service";
import { DebtPaymentsService } from "src/features/debts/debt-payments.service";
import { DebtsService } from "src/features/debts/debts.service";

@Controller(getController(MY_DEBTS_CONTROLLER, {}))
export class MyDebtsController {
	constructor(
		private readonly debtsService: DebtsService,
		private readonly debtOriginService: DebtOriginService,
		private readonly debtPaymentsService: DebtPaymentsService,
	) {}

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

	// #region Origin transactions

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
		await this.debtOriginService.userSetToDebt(
			userId,
			debtId,
			body.transactions,
		);
	}

	@ApiOperation({ summary: "Get assigned origin transactions for a debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "getAssignedOriginTransactions")
	async getAssignedOriginTransactions(
		@Param(
			getParamName(
				MY_DEBTS_CONTROLLER,
				"getAssignedOriginTransactions",
				"debtId",
			),
			ParseIntPipe,
		)
		debtId: number,
		@UserId() userId: UserModelId,
	): Promise<
		InferResponseDto<
			typeof MY_DEBTS_CONTROLLER,
			"getAssignedOriginTransactions"
		>
	> {
		const origins = await this.debtOriginService.userGetByDebt(userId, debtId);

		return {
			transactions: origins.map((origin) => ({
				...origin,
				transaction: origin.transaction,
			})),
		};
	}

	// #endregion

	// #region Payment transactions
	@ApiOperation({ summary: "Assign payment transactions to a debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "assignPaymentTransactions")
	async assignPaymentTransactions(
		@Param(
			getParamName(MY_DEBTS_CONTROLLER, "assignPaymentTransactions", "debtId"),
			ParseIntPipe,
		)
		debtId: number,
		@ValidatedBody(MY_DEBTS_CONTROLLER, "assignPaymentTransactions")
		body: InferBodyDto<typeof MY_DEBTS_CONTROLLER, "assignPaymentTransactions">,
		@UserId() userId: UserModelId,
	): Promise<
		InferResponseDto<typeof MY_DEBTS_CONTROLLER, "assignPaymentTransactions">
	> {
		await this.debtPaymentsService.userSetToDebt(
			userId,
			debtId,
			body.transactions,
		);
	}

	@ApiOperation({ summary: "Get assigned payment transactions for a debt" })
	@Endpoint(MY_DEBTS_CONTROLLER, "getAssignedPaymentTransactions")
	async getAssignedPaymentTransactions(
		@Param(
			getParamName(
				MY_DEBTS_CONTROLLER,
				"getAssignedPaymentTransactions",
				"debtId",
			),
			ParseIntPipe,
		)
		debtId: number,
		@UserId() userId: UserModelId,
	): Promise<
		InferResponseDto<
			typeof MY_DEBTS_CONTROLLER,
			"getAssignedPaymentTransactions"
		>
	> {
		const payments = await this.debtPaymentsService.userGetByDebt(
			userId,
			debtId,
		);

		return {
			transactions: payments.map((payment) => ({
				...payment,
				transaction: payment.transaction,
			})),
		};
	}

	// #endregion
}
