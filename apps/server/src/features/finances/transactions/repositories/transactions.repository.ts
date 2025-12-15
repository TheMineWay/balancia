import { type QueryOptions, Repository } from "@database/repository/repository";
import { accountTable, transactionsTable } from "@database/schemas/main.schema";
import {
	ACCOUNT_TABLE_COLUMNS,
	AccountSelect,
} from "@database/schemas/main/tables/finances/account.table";
import {
	CATEGORY_TABLE_COLUMNS,
	CategorySelect,
	categoryTable,
} from "@database/schemas/main/tables/finances/category.table";
import {
	TRANSACTIONS_TABLE_COLUMNS,
	type TransactionInsert,
	type TransactionsSelect,
	type TransactionsUpdate,
} from "@database/schemas/main/tables/finances/transaction.table";
import { Injectable } from "@nestjs/common";
import type {
	PaginatedQuery,
	PaginatedResponse,
	SearchModel,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { and, desc, eq, ilike, isNull } from "drizzle-orm";

@Injectable()
export class TransactionsRepository extends Repository {
	async findById(
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	): Promise<TransactionsSelect | null> {
		return (
			(
				await this.query(options)
					.select(TRANSACTIONS_TABLE_COLUMNS)
					.from(transactionsTable)
					.where(eq(transactionsTable.id, transactionId))
			)?.[0] ?? null
		);
	}

	async findByIdWithCategoryAndAccount(
		transactionId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		return (
			(
				await this.query(options)
					.select({
						...TRANSACTIONS_TABLE_COLUMNS,
						account: ACCOUNT_TABLE_COLUMNS,
						category: CATEGORY_TABLE_COLUMNS,
					})
					.from(transactionsTable)
					.leftJoin(
						categoryTable,
						eq(transactionsTable.categoryId, categoryTable.id),
					)
					.innerJoin(
						accountTable,
						eq(transactionsTable.accountId, accountTable.id),
					)
					.where(eq(transactionsTable.id, transactionId))
			)?.[0] ?? null
		);
	}

	async paginatedFindTransactionsListByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
		search?: SearchModel,
		filters?: Partial<Pick<TransactionModel, "accountId" | "categoryId">>,
		options?: QueryOptions,
	): Promise<
		PaginatedResponse<
			TransactionModel & {
				account: AccountSelect;
				category: CategorySelect | null;
			}
		>
	> {
		// Filters
		const queryFilters = filters
			? and(
					// Account id
					filters.accountId
						? eq(transactionsTable.accountId, filters.accountId)
						: undefined,
					// Category id
					filters.categoryId
						? eq(transactionsTable.categoryId, filters.categoryId)
						: filters.categoryId === null
							? isNull(transactionsTable.categoryId)
							: undefined,
				)
			: undefined;

		// Search
		const searchFilters = search?.search
			? ilike(transactionsTable.subject, `%${search.search}%`)
			: undefined;

		// Query
		const query = this.query(options)
			.select({
				...TRANSACTIONS_TABLE_COLUMNS,
				account: ACCOUNT_TABLE_COLUMNS,
				category: CATEGORY_TABLE_COLUMNS,
			})
			.from(transactionsTable)
			.innerJoin(accountTable, eq(transactionsTable.accountId, accountTable.id))
			.leftJoin(
				categoryTable,
				eq(transactionsTable.categoryId, categoryTable.id),
			)
			.where(and(eq(accountTable.userId, userId), queryFilters, searchFilters))
			.orderBy(desc(transactionsTable.performedAt), desc(transactionsTable.id))
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

	async bulkCreate(transactions: TransactionInsert[], options?: QueryOptions) {
		return await this.query(options)
			.insert(transactionsTable)
			.values(transactions)
			.returning(TRANSACTIONS_TABLE_COLUMNS);
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
