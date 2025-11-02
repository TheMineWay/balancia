import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { contactTable, transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { debtTable } from "@database/schemas/main/tables/debt/debt.table";
import { DebtPaymentModel } from "@shared/models";
import {
	decimal,
	index,
	integer,
	serial,
	timestamp,
	unique,
} from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<DebtPaymentModel>;

export const debtPaymentTable = debtSchema.table(
	"debt_payments",
	{
		id: serial().primaryKey(),
		debtId: integer()
			.references(() => debtTable.id, { onDelete: "cascade" })
			.notNull(),
		transactionId: integer().references(() => transactionsTable.id, {
			onDelete: "cascade",
		}),
		debtorId: integer()
			.references(() => contactTable.id)
			.notNull(),

		// Metadata
		amount: decimal({ precision: 10, scale: 2, mode: "number" }).notNull(),
		paidAt: timestamp().notNull().defaultNow(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [unique().on(table.transactionId), index().on(table.debtId)],
);

export const DEBT_PAYMENTS_TABLE_COLUMNS = {
	id: debtPaymentTable.id,
	debtId: debtPaymentTable.debtId,
	transactionId: debtPaymentTable.transactionId,
	amount: debtPaymentTable.amount,
	createdAt: debtPaymentTable.createdAt,
	updatedAt: debtPaymentTable.updatedAt,
};

/* Types */
export type DebtPaymentSelect = typeof debtPaymentTable.$inferSelect;
export type DebtPaymentInsert = typeof debtPaymentTable.$inferInsert;
export type DebtPaymentUpdate = Partial<DebtPaymentInsert>;
