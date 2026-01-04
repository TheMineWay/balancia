import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSegmentTable } from "@database/schemas/main/tables/budget/budget-segment.table";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";
import { categoryTable } from "@database/schemas/main/tables/finances/category.table";
import type { BudgetSegmentCategoryAutoMatcherModel } from "@shared/models";
import { integer, primaryKey } from "drizzle-orm/pg-core";

type ColumnsModel =
	DbModeledColumnsDefinition<BudgetSegmentCategoryAutoMatcherModel>;

/**
 * Budget Segment Category Auto Matcher Table
 * Represents the association between budget segments and categories.
 *
 * This table stores the relationships between budget segments and their associated categories.
 * This association allows the system to make automatic imputations based on predefined budget segments.
 */
export const budgetSegmentCategoryAutoMatcherTable = budgetSchema.table(
	"budget_segment_category_auto_matcher",
	{
		// Composite Primary Key
		categoryId: integer()
			.notNull()
			.references(() => categoryTable.id),
		segmentId: integer()
			.notNull()
			.references(() => budgetSegmentTable.id),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [
		// Composite Primary Key
		primaryKey({ columns: [table.categoryId, table.segmentId] }),
	],
);

export const BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_TABLE_COLUMNS = {
	segmentId: budgetSegmentCategoryAutoMatcherTable.segmentId,
	categoryId: budgetSegmentCategoryAutoMatcherTable.categoryId,
	createdAt: budgetSegmentCategoryAutoMatcherTable.createdAt,
	updatedAt: budgetSegmentCategoryAutoMatcherTable.updatedAt,
};

/* Types */
export type BudgetSegmentCategoryAutoMatcherSelect =
	typeof budgetSegmentCategoryAutoMatcherTable.$inferSelect;
export type BudgetSegmentCategoryAutoMatcherInsert =
	typeof budgetSegmentCategoryAutoMatcherTable.$inferInsert;
export type BudgetSegmentCategoryAutoMatcherUpdate =
	Partial<BudgetSegmentCategoryAutoMatcherInsert>;
