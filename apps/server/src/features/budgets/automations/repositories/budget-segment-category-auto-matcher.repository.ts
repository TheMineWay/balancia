import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	budgetSegmentImputationTable,
	budgetSegmentTable,
} from "@database/schemas/main.schema";
import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS,
	BudgetSegmentCategoryAutoMatcherInsert,
	type BudgetSegmentCategoryAutoMatcherSelect,
	budgetSegmentCategoryAutoMatcherTable,
} from "@database/schemas/main/tables/budget/budget-segment-category-auto-matcher.table";
import { BudgetSegmentSelect } from "@database/schemas/main/tables/budget/budget-segment.table";
import {
	BUDGET_TABLE_COLUMNS,
	BudgetSelect,
	budgetTable,
} from "@database/schemas/main/tables/budget/budget.table";
import { categoryTable } from "@database/schemas/main/tables/finances/category.table";
import { transactionsTable } from "@database/schemas/main/tables/finances/transaction.table";
import { Injectable } from "@nestjs/common";
import type {
	BudgetSegmentCategoryAutoMatcherListItemModel,
	BudgetSegmentCategoryAutoMatcherModel,
	BudgetSegmentModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionModel,
} from "@shared/models";
import {
	and,
	count,
	eq,
	gte,
	ilike,
	inArray,
	isNull,
	lte,
	or,
	SQLWrapper,
} from "drizzle-orm";

const PENDING_AUTO_IMPUTATIONS_BATCH_SIZE = 250;

@Injectable()
export class BudgetSegmentCategoryAutoMatcherRepository extends Repository {
	async findBySegmentAndCategory(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		category: BudgetSegmentCategoryAutoMatcherModel["categoryId"],
		options?: QueryOptions,
	): Promise<BudgetSegmentCategoryAutoMatcherSelect | null> {
		const result = await this.query(options)
			.select(BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS)
			.from(budgetSegmentCategoryAutoMatcherTable)
			.where(
				and(
					eq(budgetSegmentCategoryAutoMatcherTable.segmentId, segmentId),
					eq(budgetSegmentCategoryAutoMatcherTable.categoryId, category),
				),
			)
			.limit(1);

		return result[0] ?? null;
	}

	// #region CRUD

	async create(
		data: BudgetSegmentCategoryAutoMatcherInsert,
		options?: QueryOptions,
	): Promise<BudgetSegmentCategoryAutoMatcherSelect | null> {
		const created = await this.query(options)
			.insert(budgetSegmentCategoryAutoMatcherTable)
			.values([data])
			.returning(BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS);

		return created[0] ?? null;
	}

	async countBudgetsAutomatcherCategoriesByBudgetAndCategory(
		budgetId: BudgetSelect["id"],
		categoryId: BudgetSegmentCategoryAutoMatcherModel["categoryId"],
		options?: QueryOptions,
	): Promise<number> {
		const result = await this.query(options)
			.select({
				count: count(budgetSegmentCategoryAutoMatcherTable.categoryId),
			})
			.from(budgetSegmentCategoryAutoMatcherTable)
			.innerJoin(
				budgetSegmentTable,
				eq(
					budgetSegmentTable.id,
					budgetSegmentCategoryAutoMatcherTable.segmentId,
				),
			)
			.where(
				and(
					eq(budgetSegmentCategoryAutoMatcherTable.categoryId, categoryId),
					eq(budgetSegmentTable.budgetId, budgetId),
				),
			);

		return Number(result[0]?.count ?? 0);
	}

	async findListBySegmentId(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		{ search, pagination }: PaginatedSearchModel,
		options?: QueryOptions,
	): Promise<PaginatedResponse<BudgetSegmentCategoryAutoMatcherListItemModel>> {
		const conditions: (SQLWrapper | undefined)[] = [];

		const queryBuilder = this.query(options)
			.select({
				...BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS,
				segmentName: budgetSegmentTable.name,
				categoryName: categoryTable.name,
			})
			.from(budgetSegmentCategoryAutoMatcherTable)
			.innerJoin(
				categoryTable,
				eq(budgetSegmentCategoryAutoMatcherTable.categoryId, categoryTable.id),
			)
			.innerJoin(
				budgetSegmentTable,
				eq(
					budgetSegmentCategoryAutoMatcherTable.segmentId,
					budgetSegmentTable.id,
				),
			);

		if (search?.search) {
			conditions.push(
				or(
					ilike(categoryTable.name, `%${search.search}%`),
					ilike(categoryTable.description, `%${search.search}%`),
				),
			);
		}

		const query = queryBuilder
			.where(
				and(
					eq(budgetSegmentCategoryAutoMatcherTable.segmentId, segmentId),
					...conditions,
				),
			)
			.$dynamic();

		const { rows: items, count: total } = await this.paginated(
			pagination,
			query,
		);
		return { items, total };
	}

	async deleteBySegmentAndCategory(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		categoryId: BudgetSegmentCategoryAutoMatcherModel["categoryId"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(budgetSegmentCategoryAutoMatcherTable)
			.where(
				and(
					eq(budgetSegmentCategoryAutoMatcherTable.segmentId, segmentId),
					eq(budgetSegmentCategoryAutoMatcherTable.categoryId, categoryId),
				),
			);
	}

	// #endregion

	// #region Finders

	async findBySegmentId(
		segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"],
		options?: QueryOptions,
	): Promise<BudgetSegmentCategoryAutoMatcherSelect[]> {
		return this.query(options)
			.select(BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS)
			.from(budgetSegmentCategoryAutoMatcherTable)
			.where(eq(budgetSegmentCategoryAutoMatcherTable.segmentId, segmentId));
	}

	async findAutoImputationDetailsByCategoryId(
		categoryId: TransactionModel["id"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.select(BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS)
			.from(budgetSegmentCategoryAutoMatcherTable)
			.where(eq(budgetSegmentCategoryAutoMatcherTable.categoryId, categoryId));
	}

	// #endregion

	// #region Budget

	async findBudgetBySegmentId(
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSelect | null> {
		const result = await this.query(options)
			.select(BUDGET_TABLE_COLUMNS)
			.from(budgetTable)
			.innerJoin(
				budgetSegmentTable,
				eq(budgetSegmentTable.budgetId, budgetTable.id),
			)
			.where(eq(budgetSegmentTable.id, segmentId))
			.limit(1);

		return result[0] ?? null;
	}

	// #endregion

	// #region Transactions

	async findPendingAutoImputableTransactionsBySegmentIds(
		segmentIds: BudgetSegmentSelect["id"][],
		filters?: {
			fromDate?: Date;
			toDate?: Date;
			transactionIds?: TransactionModel["id"][];
		},
		options?: QueryOptions,
	) {
		const filterConditions: (SQLWrapper | undefined)[] = [];

		if (filters?.fromDate) {
			filterConditions.push(
				gte(transactionsTable.performedAt, filters.fromDate),
			);
		}

		if (filters?.toDate) {
			filterConditions.push(lte(transactionsTable.performedAt, filters.toDate));
		}

		if (filters?.transactionIds) {
			filterConditions.push(
				inArray(transactionsTable.id, filters.transactionIds),
			);
		}

		// Build query

		const query = this.query(options)
			.select({
				transactionId: transactionsTable.id,
				segmentId: budgetSegmentCategoryAutoMatcherTable.segmentId,
				targetCategoryId: budgetSegmentCategoryAutoMatcherTable.categoryId,
			})
			.from(transactionsTable)
			// Joins
			.innerJoin(
				budgetSegmentCategoryAutoMatcherTable,
				eq(
					budgetSegmentCategoryAutoMatcherTable.categoryId,
					transactionsTable.categoryId,
				),
			)
			.leftJoin(
				budgetSegmentImputationTable,
				eq(budgetSegmentImputationTable.transactionId, transactionsTable.id),
			)
			// Conditions
			.where(
				and(
					// Filter by segments
					inArray(budgetSegmentCategoryAutoMatcherTable.segmentId, segmentIds),
					// Filter by non-imputed transactions
					isNull(budgetSegmentImputationTable.id),
					// CustomFilters
					and(...filterConditions),
				),
			)
			.limit(PENDING_AUTO_IMPUTATIONS_BATCH_SIZE);

		return await query;
	}

	// #endregion
}
