import { timestamps } from "@database/common/timestamps";
import { debtTable, transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { integer, serial } from "drizzle-orm/pg-core";

export const debtOriginalTransactionTable = debtSchema.table(
	"debt_original_transactions",
	{
		id: serial().primaryKey(),
		debtId: integer()
			.notNull()
			.references(() => debtTable.id, { onDelete: "cascade" }),
		transactionId: integer()
			.notNull()
			.references(() => transactionsTable.id, {
				onDelete: "cascade",
			}),

		// Timestamps
		...timestamps,
	},
);

export const DEBT_ORIGINAL_TRANSACTION_TABLE_COLUMNS = {
	id: debtOriginalTransactionTable.id,
	debtId: debtOriginalTransactionTable.debtId,
	transactionId: debtOriginalTransactionTable.transactionId,
	createdAt: debtOriginalTransactionTable.createdAt,
	updatedAt: debtOriginalTransactionTable.updatedAt,
};

/* Types */
export type DebtOriginalTransactionSelect =
	typeof debtOriginalTransactionTable.$inferSelect;
export type DebtOriginalTransactionInsert =
	typeof debtOriginalTransactionTable.$inferInsert;
export type DebtOriginalTransactionUpdate =
	Partial<DebtOriginalTransactionInsert>;
