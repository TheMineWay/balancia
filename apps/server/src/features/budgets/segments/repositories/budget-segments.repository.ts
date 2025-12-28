import { type QueryOptions, Repository } from "@database/repository/repository";
import { budgetSegmentImputationTable } from "@database/schemas/main.schema";
import { BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS } from "@database/schemas/main/tables/budget/budget-segment-imputation.table";
import {
	BUDGET_SEGMENT_TABLE_COLUMNS,
	type BudgetSegmentInsert,
	type BudgetSegmentSelect,
	type BudgetSegmentUpdate,
	budgetSegmentTable,
} from "@database/schemas/main/tables/budget/budget-segment.table";
import { budgetTable } from "@database/schemas/main/tables/budget/budget.table";
import {
	ACCOUNT_TABLE_COLUMNS,
	accountTable,
} from "@database/schemas/main/tables/finances/account.table";
import {
	CATEGORY_TABLE_COLUMNS,
	categoryTable,
} from "@database/schemas/main/tables/finances/category.table";
import {
	TRANSACTIONS_TABLE_COLUMNS,
	transactionsTable,
} from "@database/schemas/main/tables/finances/transaction.table";
import { Injectable } from "@nestjs/common";
import type {
	BudgetModel,
	BudgetSegmentImputationWithTransactionModel,
	BudgetSegmentModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionFiltersModel,
	UserModelId,
} from "@shared/models";
import { and, count, desc, eq, sum } from "drizzle-orm";
import { TransactionsRepository } from "src/features/finances/transactions/repositories/transactions.repository";

@Injectable()
export class BudgetSegmentsRepository extends Repository {
	// #region CRUD
	async findById(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		return (
			(
				await this.query(options)
					.select(BUDGET_SEGMENT_TABLE_COLUMNS)
					.from(budgetSegmentTable)
					.where(eq(budgetSegmentTable.id, segmentId))
			)?.[0] || null
		);
	}

	async create(
		data: BudgetSegmentInsert,
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		const created = await this.query(options)
			.insert(budgetSegmentTable)
			.values([data])
			.returning(BUDGET_SEGMENT_TABLE_COLUMNS);
		return created?.[0] || null;
	}

	async updateById(
		segmentId: BudgetSegmentModel["id"],
		data: BudgetSegmentUpdate,
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		const updated = await this.query(options)
			.update(budgetSegmentTable)
			.set(data)
			.where(eq(budgetSegmentTable.id, segmentId))
			.returning(BUDGET_SEGMENT_TABLE_COLUMNS);
		return updated?.[0] || null;
	}

	async deleteById(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(budgetSegmentTable)
			.where(eq(budgetSegmentTable.id, segmentId));
	}

	// #endregion

	// #region Custom finds

	async findByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect[]> {
		return await this.query(options)
			.select(BUDGET_SEGMENT_TABLE_COLUMNS)
			.from(budgetSegmentTable)
			.where(eq(budgetSegmentTable.budgetId, budgetId))
			.orderBy(desc(budgetSegmentTable.id));
	}

	async findByIdAndUserId(
		segmentId: BudgetSegmentModel["id"],
		userId: UserModelId,
		options?: QueryOptions,
	): Promise<BudgetSegmentSelect | null> {
		const result = await this.query(options)
			.select(BUDGET_SEGMENT_TABLE_COLUMNS)
			.from(budgetSegmentTable)
			.innerJoin(budgetTable, eq(budgetSegmentTable.budgetId, budgetTable.id))
			.where(
				and(
					eq(budgetSegmentTable.id, segmentId),
					eq(budgetTable.userId, userId),
				),
			)
			.limit(1);

		return result?.[0] || null;
	}

	// #endregion

	// #region Transactions

	async paginatedImputationsBySegmentId(
		segmentId: BudgetSegmentModel["id"],
		{ search, pagination }: PaginatedSearchModel,
		filters?: TransactionFiltersModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<BudgetSegmentImputationWithTransactionModel>> {
		const transactionConditions =
			TransactionsRepository.buildTransactionFilters(search, filters);

		const query = this.query(options)
			.select({
				...BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS,
				// Transaction oriented
				transaction: TRANSACTIONS_TABLE_COLUMNS,
				category: CATEGORY_TABLE_COLUMNS,
				account: ACCOUNT_TABLE_COLUMNS,
			})
			.from(transactionsTable)
			.innerJoin(
				budgetSegmentImputationTable,
				eq(budgetSegmentImputationTable.transactionId, transactionsTable.id),
			)

			// Add joins for populated fields
			.innerJoin(accountTable, eq(accountTable.id, transactionsTable.accountId))
			.leftJoin(
				categoryTable,
				eq(categoryTable.id, transactionsTable.categoryId),
			)

			// Filters
			.where(
				and(
					eq(budgetSegmentImputationTable.segmentId, segmentId),
					...transactionConditions,
				),
			)
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

	// #endregion

	// #region Stats

	async getTotalPercentByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<number> {
		const result = await this.query(options)
			.select({ totalPercent: sum(budgetSegmentTable.percent) })
			.from(budgetSegmentTable)
			.where(eq(budgetSegmentTable.budgetId, budgetId))
			.limit(1);

		const count = result?.[0]?.totalPercent;
		if (typeof count === "string") return +count;
		return 0;
	}

	/**
	 * Counts the number of segments for a given budget ID.
	 */
	async countByBudgetId(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<number> {
		const result = await this.query(options)
			.select({ count: count() })
			.from(budgetSegmentTable)
			.where(eq(budgetSegmentTable.budgetId, budgetId))
			.limit(1);

		return result?.[0]?.count || 0;
	}

	// #endregion
}
