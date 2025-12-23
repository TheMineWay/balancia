import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSegmentTable } from "@database/schemas/main/tables/budget/budget-segment.table";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";
import { categoryTable } from "@database/schemas/main/tables/finances/category.table";
import type { BudgetSegmentCategoryModel } from "@shared/models";
import { integer, primaryKey } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<BudgetSegmentCategoryModel>;

export const budgetSegmentCategoryTable = budgetSchema.table(
	"budget_segment_category",
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
