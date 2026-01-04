import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS,
	BudgetSegmentCategoryAutoMatcherInsert,
	type BudgetSegmentCategoryAutoMatcherSelect,
	budgetSegmentCategoryAutoMatcherTable,
} from "@database/schemas/main/tables/budget/budget-segment-category-auto-matcher.table";
import { Injectable } from "@nestjs/common";
import type { BudgetSegmentCategoryAutoMatcherModel } from "@shared/models";
import { and, eq } from "drizzle-orm";

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
}
