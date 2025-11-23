import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { debtTable } from "@database/schemas/main/tables/debt/debt.table";
import { DEBT_PAYMENT_MODEL_VALUES, DebtPaymentModel } from "@shared/models";
import {
	decimal,
	index,
	integer,
	serial,
	timestamp,
	unique,
	varchar,
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

		// Metadata
		amount: decimal({ precision: 10, scale: 2, mode: "number" }).notNull(),
		paidAt: timestamp().notNull().defaultNow(),
		notes: varchar({ length: DEBT_PAYMENT_MODEL_VALUES.notes.maxLength }),

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
	paidAt: debtPaymentTable.paidAt,
	notes: debtPaymentTable.notes,
	createdAt: debtPaymentTable.createdAt,
	updatedAt: debtPaymentTable.updatedAt,
};

/* Types */
export type DebtPaymentSelect = typeof debtPaymentTable.$inferSelect;
export type DebtPaymentInsert = typeof debtPaymentTable.$inferInsert;
export type DebtPaymentUpdate = Partial<DebtPaymentInsert>;
