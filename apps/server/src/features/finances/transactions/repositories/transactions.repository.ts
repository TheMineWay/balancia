import { Repository, type QueryOptions } from "@database/repository/repository";
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
	TransactionFiltersModel,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { and, desc, eq, gte, ilike, isNull, lte, SQL } from "drizzle-orm";

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
		filters?: TransactionFiltersModel,
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
		const conditions = TransactionsRepository.buildTransactionFilters(
			search,
			filters,
		);

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
			.where(and(eq(accountTable.userId, userId), ...conditions))
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

	// #region Filters

	public static buildTransactionFilters(
		search?: SearchModel,
		filters?: TransactionFiltersModel,
	): SQL[] {
		const conditions: SQL[] = [];

		if (search?.search) {
			conditions.push(ilike(transactionsTable.subject, `%${search.search}%`));
		}

		if (!filters) return conditions;

		// Account id
		if (filters.accountId) {
			conditions.push(eq(transactionsTable.accountId, filters.accountId));
		}

		// Category id
		if (filters.categoryId) {
			conditions.push(eq(transactionsTable.categoryId, filters.categoryId));
		} else if (filters.categoryId === null) {
			conditions.push(isNull(transactionsTable.categoryId));
		}

		// Date range
		// From date
		if (filters.fromDate) {
			conditions.push(gte(transactionsTable.performedAt, filters.fromDate));
		}

		// To date
		if (filters.toDate) {
			conditions.push(lte(transactionsTable.performedAt, filters.toDate));
		}

		return conditions;
	}

	// #endregion
}
