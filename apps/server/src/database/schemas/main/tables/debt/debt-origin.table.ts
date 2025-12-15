import { timestamps } from "@database/common/timestamps";
import { debtTable, transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { DEBT_ORIGIN_MODEL_VALUES } from "@shared/models";
import { integer, serial, varchar } from "drizzle-orm/pg-core";

export const debtOriginTable = debtSchema.table("debt_origin_transactions", {
	id: serial().primaryKey(),
	debtId: integer()
		.notNull()
		.references(() => debtTable.id, { onDelete: "cascade" }),
	transactionId: integer().references(() => transactionsTable.id, {
		onDelete: "set null",
	}),

	// Metadata
	amount: integer().notNull(),
	notes: varchar({ length: DEBT_ORIGIN_MODEL_VALUES.notes.maxLength }),

	// Timestamps
	...timestamps,
});

export const DEBT_ORIGIN_TABLE_COLUMNS = {
	id: debtOriginTable.id,
	debtId: debtOriginTable.debtId,
	transactionId: debtOriginTable.transactionId,
	amount: debtOriginTable.amount,
	notes: debtOriginTable.notes,
	createdAt: debtOriginTable.createdAt,
	updatedAt: debtOriginTable.updatedAt,
};

/* Types */
export type DebtOriginSelect = typeof debtOriginTable.$inferSelect;
export type DebtOriginInsert = typeof debtOriginTable.$inferInsert;
export type DebtOriginUpdate = Partial<DebtOriginInsert>;
