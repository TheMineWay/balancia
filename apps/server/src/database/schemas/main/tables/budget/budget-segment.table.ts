import { percentColumn, percentColumnCheck } from "@database/common/percent";
import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";
import { budgetTable } from "@database/schemas/main/tables/budget/budget.table";
import {
	BUDGET_SEGMENT_MODEL_VALUES,
	type BudgetSegmentModel,
} from "@shared/models";
import { check, index, integer, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<BudgetSegmentModel>;

export const budgetSegmentTable = budgetSchema.table(
	"budget_segment",
	{
		id: serial().primaryKey(),
		budgetId: integer()
			.notNull()
			.references(() => budgetTable.id),

		// Metadata
		name: varchar({
			length: BUDGET_SEGMENT_MODEL_VALUES.name.maxLength,
		}).notNull(),
		description: varchar({
			length: BUDGET_SEGMENT_MODEL_VALUES.description.maxLength,
		}),
		percent: percentColumn.notNull(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [
		check("budget_segment_percent_chk", percentColumnCheck(table.percent)),
		index().on(table.budgetId),
	],
);

export const BUDGET_SEGMENT_TABLE_COLUMNS = {
	id: budgetSegmentTable.id,
	budgetId: budgetSegmentTable.budgetId,
	name: budgetSegmentTable.name,
	description: budgetSegmentTable.description,
	percent: budgetSegmentTable.percent,
	createdAt: budgetSegmentTable.createdAt,
	updatedAt: budgetSegmentTable.updatedAt,
};

/* Types */
export type BudgetSegmentSelect = typeof budgetSegmentTable.$inferSelect;
export type BudgetSegmentInsert = typeof budgetSegmentTable.$inferInsert;
export type BudgetSegmentUpdate = Partial<BudgetSegmentInsert>;
