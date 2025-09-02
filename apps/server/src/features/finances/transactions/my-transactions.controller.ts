import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	getParamName,
	InferBodyDto,
	InferQueryDto,
	InferResponseDto,
	MY_TRANSACTION_CONTROLLER,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { TransactionsService } from "src/features/finances/transactions/transactions.service";

@Controller(getController(MY_TRANSACTION_CONTROLLER, {}))
export class MyTransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@ApiOperation({ summary: "Get paginated list of user transactions" })
	@Endpoint(MY_TRANSACTION_CONTROLLER, "getTransactionsList")
	async getTransactionsList(
		@ValidatedQuery(MY_TRANSACTION_CONTROLLER, "getTransactionsList")
		{
			filters,
			search,
			...query
		}: InferQueryDto<typeof MY_TRANSACTION_CONTROLLER, "getTransactionsList">,
		@UserId() userId: UserModel["id"],
	): Promise<
		InferResponseDto<typeof MY_TRANSACTION_CONTROLLER, "getTransactionsList">
	> {
		return await this.transactionsService.getTransactionsListByUserId(
			userId,
			query,
			search,
			filters,
		);
	}

	@ApiOperation({ summary: "Create a new user transaction" })
	@Endpoint(MY_TRANSACTION_CONTROLLER, "createTransaction")
	async createTransaction(
		@ValidatedBody(MY_TRANSACTION_CONTROLLER, "createTransaction")
		body: InferBodyDto<typeof MY_TRANSACTION_CONTROLLER, "createTransaction">,
		@UserId() userId: UserModel["id"],
	): Promise<
		InferResponseDto<typeof MY_TRANSACTION_CONTROLLER, "createTransaction">
	> {
		await this.transactionsService.create(userId, body);
	}

	@ApiOperation({ summary: "Update an existing user transaction" })
	@Endpoint(MY_TRANSACTION_CONTROLLER, "updateTransaction")
	async updateTransaction(
		@ValidatedBody(MY_TRANSACTION_CONTROLLER, "updateTransaction")
		body: InferBodyDto<typeof MY_TRANSACTION_CONTROLLER, "updateTransaction">,
		@UserId() userId: UserModel["id"],
		@Param(
			getParamName(MY_TRANSACTION_CONTROLLER, "updateTransaction", "id"),
			ParseIntPipe,
		)
		transactionId: number,
	): Promise<
		InferResponseDto<typeof MY_TRANSACTION_CONTROLLER, "updateTransaction">
	> {
		await this.transactionsService.updateByUserIdAndId(
			userId,
			transactionId,
			body,
		);
	}

	@ApiOperation({ summary: "Delete a user transaction" })
	@Endpoint(MY_TRANSACTION_CONTROLLER, "deleteTransaction")
	async deleteTransaction(
		@UserId()
		userId: UserModel["id"],
		@Param(
			getParamName(MY_TRANSACTION_CONTROLLER, "deleteTransaction", "id"),
			ParseIntPipe,
		)
		transactionId: number,
	): Promise<
		InferResponseDto<typeof MY_TRANSACTION_CONTROLLER, "deleteTransaction">
	> {
		await this.transactionsService.deleteByUserIdAndId(userId, transactionId);
	}
}
