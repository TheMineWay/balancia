import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import {
	budgetSegmentTable,
	transactionsTable,
} from "@database/schemas/main.schema";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";

import {
	BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES,
	type BudgetSegmentImputationModel,
} from "@shared/models";
import { integer, serial, unique, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<BudgetSegmentImputationModel>;

export const budgetSegmentImputationTable = budgetSchema.table(
	"budget_segment_imputation",
	{
		id: serial().primaryKey(),

		// References
		segmentId: integer()
			.notNull()
			.references(() => budgetSegmentTable.id),
		transactionId: integer()
			.notNull()
			.references(() => transactionsTable.id),

		// Metadata
		description: varchar({
			length: BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES.description.maxLength,
		}),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [unique().on(table.segmentId, table.transactionId)],
);

export const BUDGET_SEGMENT_IMPUTATION_TABLE_COLUMNS = {
	id: budgetSegmentImputationTable.id,
	segmentId: budgetSegmentImputationTable.segmentId,
	transactionId: budgetSegmentImputationTable.transactionId,
	description: budgetSegmentImputationTable.description,
	createdAt: budgetSegmentImputationTable.createdAt,
	updatedAt: budgetSegmentImputationTable.updatedAt,
};

/* Types */
export type BudgetSegmentImputationSelect =
	typeof budgetSegmentImputationTable.$inferSelect;
export type BudgetSegmentImputationInsert =
	typeof budgetSegmentImputationTable.$inferInsert;
export type BudgetSegmentImputationUpdate =
	Partial<BudgetSegmentImputationInsert>;
