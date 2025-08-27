import type { QueryOptions } from "@database/repository/repository";
import { AccountSelect } from "@database/schemas/main/tables/finances/account.table";
import { Injectable } from "@nestjs/common";
import type { AccountModel, TransactionModel, UserModel } from "@shared/models";
import { AccountsRepository } from "src/features/finances/accounts/repositories/accounts.repository";

@Injectable()
export class AccountsService {
	constructor(private readonly accountsRepository: AccountsRepository) {}

	async checkAccountOwnership(
		userId: UserModel["id"],
		accountId: AccountModel["id"],
		queryOptions?: QueryOptions,
	): Promise<CheckAccountOwnershipResponse> {
		const account = await this.accountsRepository.findByUserIdAndId(
			userId,
			accountId,
			queryOptions,
		);

		return {
			account,
			isOwner: account?.userId === userId,
		} as CheckAccountOwnershipResponse;
	}

	async getAccountByTransactionId(
		transactionId: TransactionModel["id"],
		queryOptions?: QueryOptions,
	) {
		return await this.accountsRepository.findAccountByTransactionId(
			transactionId,
			queryOptions,
		);
	}
}

/* Internal */

type CheckAccountOwnershipResponse =
	| { isOwner: true; account: AccountSelect }
	| { isOwner: false; account: null };
