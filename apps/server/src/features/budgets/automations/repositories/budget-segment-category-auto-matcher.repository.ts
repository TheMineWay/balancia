import { type QueryOptions, Repository } from "@database/repository/repository";
import { budgetSegmentTable } from "@database/schemas/main.schema";
import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS,
	BudgetSegmentCategoryAutoMatcherInsert,
	type BudgetSegmentCategoryAutoMatcherSelect,
	budgetSegmentCategoryAutoMatcherTable,
} from "@database/schemas/main/tables/budget/budget-segment-category-auto-matcher.table";
import { categoryTable } from "@database/schemas/main/tables/finances/category.table";
import { Injectable } from "@nestjs/common";
import type {
	BudgetSegmentCategoryAutoMatcherListItemModel,
	BudgetSegmentCategoryAutoMatcherModel,
	PaginatedResponse,
	PaginatedSearchModel,
} from "@shared/models";
import { and, eq, ilike, or, SQLWrapper } from "drizzle-orm";

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
}
