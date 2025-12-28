import { moneyColumn } from "@database/common/money";
import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { budgetSchema } from "@database/schemas/main/tables/budget/budget.schema";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import { BUDGET_MODEL_VALUES, type BudgetModel } from "@shared/models";
import { date, index, integer, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<BudgetModel>;

export const budgetTable = budgetSchema.table(
	"budget",
	{
		id: serial().primaryKey(),
		userId: integer()
			.notNull()
			.references(() => userTable.id),

		// Essentials
		fromDate: date({ mode: "date" }).notNull(),
		toDate: date({ mode: "date" }).notNull(),
		name: varchar({ length: BUDGET_MODEL_VALUES.name.maxLength }).notNull(),
		description: varchar({ length: BUDGET_MODEL_VALUES.description.maxLength }),
		amount: moneyColumn.notNull(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [index().on(table.userId)],
);

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
export type BudgetSelect = typeof budgetTable.$inferSelect;
export type BudgetInsert = Omit<
	typeof budgetTable.$inferInsert,
	"id" | "createdAt" | "updatedAt"
>;
export type BudgetUpdate = Partial<BudgetInsert>;
