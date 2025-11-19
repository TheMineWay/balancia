import { timestamps } from "@database/common/timestamps";
import { debtTable, transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { integer, serial } from "drizzle-orm/pg-core";

export const debtOriginTable = debtSchema.table("debt_origin_transactions", {
	id: serial().primaryKey(),
	debtId: integer()
		.notNull()
		.references(() => debtTable.id, { onDelete: "cascade" }),
	transactionId: integer()
		.notNull()
		.references(() => transactionsTable.id, {
			onDelete: "cascade",
		}),

	amount: integer().notNull(),

	// Timestamps
	...timestamps,
});

export const DEBT_ORIGIN_TABLE_COLUMNS = {
	id: debtOriginTable.id,
	debtId: debtOriginTable.debtId,
	transactionId: debtOriginTable.transactionId,
	createdAt: debtOriginTable.createdAt,
	updatedAt: debtOriginTable.updatedAt,
};

/* Types */
export type DebtOriginSelect = typeof debtOriginTable.$inferSelect;
export type DebtOriginInsert = typeof debtOriginTable.$inferInsert;
export type DebtOriginUpdate = Partial<DebtOriginInsert>;
