import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSegmentAutoImputationHistoryTable } from "@database/schemas/main/tables/budget/budget-segment-auto-imputation-history.table";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";
import { categoryTable } from "@database/schemas/main/tables/finances/category.table";
import type { BudgetSegmentCategoryAutoImputationHistoryModel } from "@shared/models";
import { index, integer } from "drizzle-orm/pg-core";

type ColumnsModel =
	DbModeledColumnsDefinition<BudgetSegmentCategoryAutoImputationHistoryModel>;

export const budgetSegmentCategoryAutoImputationHistoryTable =
	budgetSchema.table(
		"budget_segment_category_auto_imputation_history",
		{
			historyImputationId: integer()
				.notNull()
				.references(() => budgetSegmentAutoImputationHistoryTable.imputationId)
				.primaryKey(),
			categoryId: integer()
				.notNull()
				.references(() => categoryTable.id),

			// Timestamps
			...timestamps,
		} satisfies ColumnsModel,
		(table) => [index().on(table.categoryId)],
	);

export const BUDGET_SEGMENT_CATEGORY_AUTO_IMPUTATION_HISTORY_TABLE_COLUMNS = {
	historyImputationId:
		budgetSegmentCategoryAutoImputationHistoryTable.historyImputationId,
	categoryId: budgetSegmentCategoryAutoImputationHistoryTable.categoryId,
	createdAt: budgetSegmentCategoryAutoImputationHistoryTable.createdAt,
	updatedAt: budgetSegmentCategoryAutoImputationHistoryTable.updatedAt,
};

/* Types */
export type BudgetSegmentCategoryAutoImputationHistorySelect =
	typeof budgetSegmentCategoryAutoImputationHistoryTable.$inferSelect;
export type BudgetSegmentCategoryAutoImputationHistoryInsert =
	typeof budgetSegmentCategoryAutoImputationHistoryTable.$inferInsert;
export type BudgetSegmentCategoryAutoImputationHistoryUpdate =
	Partial<BudgetSegmentCategoryAutoImputationHistoryInsert>;
