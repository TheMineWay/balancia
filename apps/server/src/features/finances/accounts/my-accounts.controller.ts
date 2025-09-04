import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import {
	Controller,
	NotFoundException,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	getParamName,
	InferBodyDto,
	InferQueryDto,
	InferResponseDto,
	MY_ACCOUNTS_CONTROLLER,
} from "@shared/api-definition";
import type { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";
import { AccountsService } from "src/features/finances/accounts/accounts.service";

@Controller(getController(MY_ACCOUNTS_CONTROLLER, {}))
export class MyAccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@ApiOperation({ summary: "Get paginated list of user accounts" })
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

	@ApiOperation({ summary: "Get details of a specific user account" })
	@Endpoint(MY_ACCOUNTS_CONTROLLER, "get")
	async getAccount(
		@UserId() userId: UserModel["id"],
		@Param(getParamName(MY_ACCOUNTS_CONTROLLER, "get", "id"), ParseIntPipe)
		accountId: number,
	): Promise<InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "get">> {
		const account = await this.accountsService.getUserAccountById(
			userId,
			accountId,
		);
		if (!account) throw new NotFoundException();

		return account;
	}

	@ApiOperation({ summary: "Create a new user account" })
	@Endpoint(MY_ACCOUNTS_CONTROLLER, "create")
	async create(
		@UserId() userId: UserModel["id"],
		@ValidatedBody(MY_ACCOUNTS_CONTROLLER, "create") body: InferBodyDto<
			typeof MY_ACCOUNTS_CONTROLLER,
			"create"
		>,
	): Promise<InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "create">> {
		await this.accountsService.createUserAccount(userId, body);
	}

	@ApiOperation({ summary: "Update an existing user account" })
	@Endpoint(MY_ACCOUNTS_CONTROLLER, "update")
	async update(
		@UserId() userId: UserModel["id"],
		@Param(getParamName(MY_ACCOUNTS_CONTROLLER, "update", "id"), ParseIntPipe)
		accountId: number,
		@ValidatedBody(MY_ACCOUNTS_CONTROLLER, "update") body: InferBodyDto<
			typeof MY_ACCOUNTS_CONTROLLER,
			"update"
		>,
	): Promise<InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "update">> {
		await this.accountsService.updateUserAccountById(userId, accountId, body);
	}

	@ApiOperation({ summary: "Delete a user account" })
	@Endpoint(MY_ACCOUNTS_CONTROLLER, "delete")
	async delete(
		@UserId() userId: UserModel["id"],
		@Param(getParamName(MY_ACCOUNTS_CONTROLLER, "delete", "id"), ParseIntPipe)
		accountId: number,
	): Promise<InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "delete">> {
		await this.accountsService.deleteUserAccountById(userId, accountId);
	}

	// Stats

	@Endpoint(MY_ACCOUNTS_CONTROLLER, "getMonthlyStats")
	async getMonthlyStats(
		@UserId() userId: UserModel["id"],
		@Param(
			getParamName(MY_ACCOUNTS_CONTROLLER, "getMonthlyStats", "id"),
			ParseIntPipe,
		)
		accountId: number,
	): Promise<
		InferResponseDto<typeof MY_ACCOUNTS_CONTROLLER, "getMonthlyStats">
	> {
		return {
			stats: await this.accountsService.getUserAccountMonthlyStats(
				userId,
				accountId,
			),
		};
	}
}
