import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSegmentImputationTable } from "@database/schemas/main/tables/budget/budget-segment-imputation.table";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";
import { BudgetSegmentAutoImputationHistoryModel } from "@shared/models";
import { integer, unique } from "drizzle-orm/pg-core";

type ColumnsModel =
	DbModeledColumnsDefinition<BudgetSegmentAutoImputationHistoryModel>;

export const budgetSegmentAutoImputationHistoryTable = budgetSchema.table(
	"budget_segment_auto_imputation_history",
	{
		imputationId: integer()
			.notNull()
			.references(() => budgetSegmentImputationTable.id)
			.primaryKey(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [unique().on(table.imputationId)],
);

export const BUDGET_SEGMENT_AUTO_IMPUTATION_HISTORY_TABLE_COLUMNS = {
	imputationId: budgetSegmentAutoImputationHistoryTable.imputationId,
	createdAt: budgetSegmentAutoImputationHistoryTable.createdAt,
	updatedAt: budgetSegmentAutoImputationHistoryTable.updatedAt,
};

/* Types */
export type BudgetSegmentAutoImputationHistorySelect =
	typeof budgetSegmentAutoImputationHistoryTable.$inferSelect;
export type BudgetSegmentAutoImputationHistoryInsert =
	typeof budgetSegmentAutoImputationHistoryTable.$inferInsert;
export type BudgetSegmentAutoImputationHistoryUpdate =
	Partial<BudgetSegmentAutoImputationHistoryInsert>;
