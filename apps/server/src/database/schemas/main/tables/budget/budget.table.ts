import { moneyColumn } from "@database/common/money";
import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSchema, userTable } from "@database/schemas/main.schema";
import { BUDGET_MODEL_VALUES, type BudgetModel } from "@shared/models";
import { date, integer, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<BudgetModel>;

export const budgetTable = budgetSchema.table("budget", {
	id: serial().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => userTable.id),

	// Essentials
	fromDate: date().notNull(),
	toDate: date().notNull(),
	name: varchar({ length: BUDGET_MODEL_VALUES.name.maxLength }).notNull(),
	description: varchar({ length: BUDGET_MODEL_VALUES.description.maxLength }),
	amount: moneyColumn.notNull(),

	// Timestamps
	...timestamps,
} satisfies ColumnsModel);

export const BUDGET_TABLE_COLUMNS = {
	id: budgetTable.id,
	userId: budgetTable.userId,
	fromDate: budgetTable.fromDate,
	toDate: budgetTable.toDate,
	name: budgetTable.name,
	description: budgetTable.description,
	amount: budgetTable.amount,
	createdAt: budgetTable.createdAt,
	updatedAt: budgetTable.updatedAt,
};

/* Types */
export type BudgetTableSelect = typeof budgetTable.$inferSelect;
export type BudgetTableInsert = typeof budgetTable.$inferInsert;
export type BudgetTableUpdate = Partial<BudgetTableInsert>;
