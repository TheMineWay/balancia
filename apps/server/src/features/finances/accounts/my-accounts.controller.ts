import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller } from "@nestjs/common";
import {
	getController,
	InferQueryDto,
	InferResponseDto,
	MY_ACCOUNTS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { AccountsService } from "src/features/finances/accounts/accounts.service";

@Controller(getController(MY_ACCOUNTS_CONTROLLER, {}))
export class MyAccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@Endpoint(MY_ACCOUNTS_CONTROLLER, "getAccounts")
	async getAccounts(
		@UserId() userId: UserModel["id"],
		@ValidatedQuery(MY_ACCOUNTS_CONTROLLER, "getAccounts")
		query: InferQueryDto<typeof MY_ACCOUNTS_CONTROLLER, "getAccounts">,
	): Promise<InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "getAccounts">> {
		return await this.accountsService.getPaginatedAccountsByUserId(
			userId,
			query,
		);
	}
}
