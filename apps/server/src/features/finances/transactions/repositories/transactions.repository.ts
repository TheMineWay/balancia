import { type QueryOptions, Repository } from "@database/repository/repository";
import { transactionsTable } from "@database/schemas/main.schema";
import type {
	TransactionInsert,
	TransactionsUpdate,
} from "@database/schemas/main/tables/transactions/transaction.table";
import { Injectable } from "@nestjs/common";
import type {
	OwnedModel,
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
	): Promise<PaginatedResponse<OwnedModel<TransactionModel>>> {
		const query = this.query(options)
			.select()
			.from(transactionsTable)
			.where(eq(transactionsTable.userId, userId))
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

	async updateByIdAndUserId(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		transaction: TransactionsUpdate,
		options?: QueryOptions,
	) {
		return (
			await this.query(options)
				.update(transactionsTable)
				.set(transaction)
				.where(
					and(
						eq(transactionsTable.userId, userId),
						eq(transactionsTable.id, transactionId),
					),
				)
				.returning()
		)[0];
	}

	async deleteByUserIdAndId(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.delete(transactionsTable)
			.where(
				and(
					eq(transactionsTable.id, transactionId),
					eq(transactionsTable.userId, userId),
				),
			)
			.returning();
	}
}
