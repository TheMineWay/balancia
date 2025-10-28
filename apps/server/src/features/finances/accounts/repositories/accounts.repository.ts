import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	accountCategoryExpensesStatsMaterializedView,
	accountMonthlyStatsMaterializedView,
	accountTable,
	categoryTable,
	transactionsTable,
} from "@database/schemas/main.schema";
import {
	AccountInsert,
	AccountSelect,
	AccountUpdate,
} from "@database/schemas/main/tables/finances/account.table";
import { CATEGORY_TABLE_COLUMNS } from "@database/schemas/main/tables/finances/category.table";
import { Injectable } from "@nestjs/common";
import type {
	AccountModel,
	CategoryExpensesModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { and, desc, eq, gte, ilike, lte, sum } from "drizzle-orm";

@Injectable()
export class AccountsRepository extends Repository {
	async paginatedFindByUserId(
		userId: UserModel["id"],
		{ pagination, search }: PaginatedSearchModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<AccountSelect>> {
		const query = this.query(options)
			.select()
			.from(accountTable)
			.where(
				and(
					eq(accountTable.userId, userId),
					search?.search
						? ilike(accountTable.name, `%${search.search}%`)
						: undefined,
				),
			)
			.orderBy(desc(accountTable.id))
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

	async create(data: AccountInsert, options?: QueryOptions) {
		return (
			await this.query(options).insert(accountTable).values(data).returning()
		)[0];
	}

	async updateById(
		accountId: AccountModel["id"],
		data: AccountUpdate,
		options?: QueryOptions,
	): Promise<AccountSelect | null> {
		return (
			(
				await this.query(options)
					.update(accountTable)
					.set(data)
					.where(eq(accountTable.id, accountId))
					.returning()
			)?.[0] ?? null
		);
	}

	async deleteById(accountId: AccountModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.delete(accountTable)
			.where(eq(accountTable.id, accountId));
	}

	// #region Stats

	async findAccountMonthlyStats(
		accountId: AccountModel["id"],
		filters: { startDate?: Date; endDate?: Date } = {},
		options?: QueryOptions,
	) {
		const where = and(
			filters.startDate
				? gte(accountMonthlyStatsMaterializedView.date, filters.startDate)
				: undefined,
			filters.endDate
				? lte(accountMonthlyStatsMaterializedView.date, filters.endDate)
				: undefined,
		);

		const rows = await this.query(options)
			.select()
			.from(accountMonthlyStatsMaterializedView)
			.where(
				and(
					eq(accountMonthlyStatsMaterializedView.accountId, accountId),
					where,
				),
			);

		return rows.map((row) => ({
			...row,
			date: new Date(row.date),
			monthlyBalance: Number(row.monthlyBalance),
			income: Number(row.income),
			outcome: Number(row.outcome),
		}));
	}

	async findAccountCategoryExpensesStats(
		accountId: AccountModel["id"],
		filters: { startDate?: Date; endDate?: Date } = {},
		options?: QueryOptions,
	): Promise<CategoryExpensesModel[]> {
		const statsCondition = and(
			filters.startDate
				? gte(
						accountCategoryExpensesStatsMaterializedView.date,
						filters.startDate,
					)
				: undefined,
			filters.endDate
				? lte(
						accountCategoryExpensesStatsMaterializedView.date,
						filters.endDate,
					)
				: undefined,
		);
		const statsQuery = this.query(options)
			.select({
				accountId: accountCategoryExpensesStatsMaterializedView.accountId,
				categoryId: accountCategoryExpensesStatsMaterializedView.categoryId,
				income: sum(accountCategoryExpensesStatsMaterializedView.income).as(
					"income",
				),
				outcome: sum(accountCategoryExpensesStatsMaterializedView.outcome).as(
					"outcome",
				),
			})
			.from(accountCategoryExpensesStatsMaterializedView)
			.where(statsCondition)
			.groupBy(
				accountCategoryExpensesStatsMaterializedView.accountId,
				accountCategoryExpensesStatsMaterializedView.categoryId,
			)
			.as("stats");

		const condition = and(eq(statsQuery.accountId, accountId));
		const data = await this.query(options)
			.select({
				category: CATEGORY_TABLE_COLUMNS,
				income: statsQuery.income,
				outcome: statsQuery.outcome,
			})
			.from(statsQuery)
			.leftJoin(categoryTable, eq(statsQuery.categoryId, categoryTable.id))
			.where(condition);

		return data.map((row) => ({
			...row,
			income: Number(row.income),
			outcome: Number(row.outcome),
		}));
	}

	// #endregion
}
