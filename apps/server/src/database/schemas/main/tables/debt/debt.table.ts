import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { contactTable, transactionsTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { DEBT_MODEL_VALUES, type DebtModel } from "@shared/models";
import {
	decimal,
	index,
	integer,
	serial,
	timestamp,
	unique,
	varchar,
} from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<DebtModel>;

export const debtTable = debtSchema.table(
	"debts",
	{
		id: serial().primaryKey(),
		transactionId: integer().references(() => transactionsTable.id, {
			onDelete: "cascade",
		}),
		debtorId: integer()
			.references(() => contactTable.id, { onDelete: "cascade" })
			.notNull(),
		userId: integer().notNull(),

		// Meta
		amount: decimal({ precision: 10, scale: 2, mode: "number" }).notNull(),
		reason: varchar({
			length: DEBT_MODEL_VALUES.reason.maxLength,
		}),
		notifiedAt: timestamp(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [
		unique().on(table.debtorId, table.transactionId),
		index().on(table.userId, table.notifiedAt),
	],
);

export const DEBT_TABLE_COLUMNS = {
	id: debtTable.id,
	transactionId: debtTable.transactionId,
	debtorId: debtTable.debtorId,
	userId: debtTable.userId,
	amount: debtTable.amount,
	reason: debtTable.reason,
	notifiedAt: debtTable.notifiedAt,
	createdAt: debtTable.createdAt,
	updatedAt: debtTable.updatedAt,
};

/* Types */
export type DebtSelect = typeof debtTable.$inferSelect;
export type DebtInsert = typeof debtTable.$inferInsert;
export type DebtUpdate = Partial<DebtInsert>;
