import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import {
	Controller,
	NotFoundException,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import {
	getController,
	getParamName,
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

	@Endpoint(MY_ACCOUNTS_CONTROLLER, "getAccount")
	async getAccount(
		@UserId() userId: UserModel["id"],
		@Param(
			getParamName(MY_ACCOUNTS_CONTROLLER, "getAccount", "id"),
			ParseIntPipe,
		)
		accountId: number,
	): Promise<InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "getAccount">> {
		const account = await this.accountsService.getUserAccountById(
			userId,
			accountId,
		);
		if (!account) throw new NotFoundException();

		return account;
	}
}
