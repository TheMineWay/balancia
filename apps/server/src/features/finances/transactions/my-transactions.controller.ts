import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller } from "@nestjs/common";
import {
	getController,
	InferQueryDto,
	InferResponseDto,
	MY_TRANSACTION_CONTROLLER,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { TransactionsService } from "src/features/finances/transactions/transactions.service";

@Controller(getController(MY_TRANSACTION_CONTROLLER, {}))
export class MyTransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Endpoint(MY_TRANSACTION_CONTROLLER, "getMyTransactions")
	async getMyTransactions(
		@ValidatedQuery(MY_TRANSACTION_CONTROLLER, "getMyTransactions")
		query: InferQueryDto<typeof MY_TRANSACTION_CONTROLLER, "getMyTransactions">,
		@UserId() userId: UserModel["id"],
	): Promise<
		InferResponseDto<typeof MY_TRANSACTION_CONTROLLER, "getMyTransactions">
	> {
		return await this.transactionsService.getPaginatedTransactionsById(
			userId,
			query,
		);
	}
}
