import { type QueryOptions, Repository } from "@database/repository/repository";
import { accountTable, transactionsTable } from "@database/schemas/main.schema";
import type {
	TransactionInsert,
	TransactionsSelect,
	TransactionsUpdate,
} from "@database/schemas/main/tables/finances/transaction.table";
import { Injectable } from "@nestjs/common";
import type {
	PaginatedQuery,
	PaginatedResponse,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { and, desc, eq } from "drizzle-orm";

@Injectable()
export class TransactionsRepository extends Repository {
	async paginatedFindTransactionsByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
		options?: QueryOptions,
	): Promise<PaginatedResponse<TransactionModel>> {
		const query = this.query(options)
			.select({
				id: transactionsTable.id,
				amount: transactionsTable.amount,
				subject: transactionsTable.subject,
				performedAt: transactionsTable.performedAt,
				performedAtPrecision: transactionsTable.performedAtPrecision,
				categoryId: transactionsTable.categoryId,
				accountId: transactionsTable.accountId,
				createdAt: transactionsTable.createdAt,
				updatedAt: transactionsTable.updatedAt,
			})
			.from(transactionsTable)
			.innerJoin(accountTable, eq(transactionsTable.accountId, accountTable.id))
			.where(eq(accountTable.userId, userId))
			.orderBy(desc(transactionsTable.performedAt))
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);

		return {
			items,
			total,
		};
	}

	async create(transaction: TransactionInsert, options?: QueryOptions) {
		return (
			await this.query(options)
				.insert(transactionsTable)
				.values(transaction)
				.returning()
		)[0];
	}

	async updateById(
		transactionId: TransactionModel["id"],
		transaction: TransactionsUpdate,
		options?: QueryOptions,
	): Promise<TransactionsSelect | undefined> {
		return (
			await this.query(options)
				.update(transactionsTable)
				.set(transaction)
				.where(eq(transactionsTable.id, transactionId))
				.returning()
		)?.[0];
	}

	async deleteById(
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.delete(transactionsTable)
			.where(and(eq(transactionsTable.id, transactionId)));
	}
}
