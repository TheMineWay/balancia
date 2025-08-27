import { QueryOptions, Repository } from "@database/repository/repository";
import { accountTable, transactionsTable } from "@database/schemas/main.schema";
import { AccountSelect } from "@database/schemas/main/tables/finances/account.table";
import { Injectable } from "@nestjs/common";
import type { AccountModel, TransactionModel, UserModel } from "@shared/models";
import { and, eq } from "drizzle-orm";

@Injectable()
export class AccountsRepository extends Repository {
	async findByUserIdAndId(
		userId: UserModel["id"],
		accountId: AccountModel["id"],
		options?: QueryOptions,
	): Promise<AccountSelect | null> {
		return (
			(
				await this.query(options)
					.select()
					.from(accountTable)
					.where(
						and(
							eq(accountTable.id, accountId),
							eq(accountTable.userId, userId),
						),
					)
					.limit(1)
			)?.[0] ?? null
		);
	}

	async findAccountByTransactionId(
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	): Promise<AccountSelect | null> {
		return (
			(
				await this.query(options)
					.select({
						id: accountTable.id,
						name: accountTable.name,
						description: accountTable.description,
						userId: accountTable.userId,
						createdAt: accountTable.createdAt,
						updatedAt: accountTable.updatedAt,
					})
					.from(accountTable)
					.innerJoin(
						transactionsTable,
						eq(transactionsTable.accountId, accountTable.id),
					)
					.where(eq(transactionsTable.id, transactionId))
					.limit(1)
			)?.[0] ?? null
		);
	}
}
