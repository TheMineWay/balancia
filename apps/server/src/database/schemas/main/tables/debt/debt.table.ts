import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { contactTable } from "@database/schemas/main.schema";
import { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
import { DEBT_MODEL_VALUES, type DebtModel, DebtStatus } from "@shared/models";
import {
	decimal,
	index,
	integer,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

/* Enum */

export const debtStatusEnum = debtSchema.enum("debt_status", [
	DebtStatus.PENDING,
	DebtStatus.PAID,
	DebtStatus.WONT_PAY,
	DebtStatus.PARDONED,
]);

/* Table */

type ColumnsModel = DbModeledColumnsDefinition<DebtModel>;

export const debtTable = debtSchema.table(
	"debts",
	{
		id: serial().primaryKey(),
		debtorId: integer()
			.references(() => contactTable.id, { onDelete: "cascade" })
			.notNull(),
		userId: integer().notNull(),

		// Metadata
		amount: decimal({ precision: 10, scale: 2, mode: "number" }).notNull(),
		reason: varchar({
			length: DEBT_MODEL_VALUES.reason.maxLength,
		}),
		notifiedAt: timestamp(),
		status: debtStatusEnum()
			.notNull()
			.default(DEBT_MODEL_VALUES.status.default),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [
		index().on(table.debtorId),
		index().on(table.userId, table.notifiedAt),
	],
);

export const DEBT_TABLE_COLUMNS = {
	id: debtTable.id,
	debtorId: debtTable.debtorId,
	userId: debtTable.userId,
	amount: debtTable.amount,
	reason: debtTable.reason,
	notifiedAt: debtTable.notifiedAt,
	status: debtTable.status,
	createdAt: debtTable.createdAt,
	updatedAt: debtTable.updatedAt,
};

/* Types */
export type DebtSelect = typeof debtTable.$inferSelect;
export type DebtInsert = typeof debtTable.$inferInsert;
export type DebtUpdate = Partial<DebtInsert>;
