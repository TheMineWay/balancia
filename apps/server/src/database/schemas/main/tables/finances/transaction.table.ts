import { moneyColumn } from "@database/common/money";
import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { accountTable, timePrecisionEnum } from "@database/schemas/main.schema";
import { categoryTable } from "@database/schemas/main/tables/finances/category.table";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import {
	TimePrecision,
	TRANSACTION_MODEL_VALUES,
	type TransactionModel,
} from "@shared/models";
import { sql } from "drizzle-orm";
import {
	index,
	integer,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<TransactionModel>;

export const transactionsTable = financesSchema.table(
	"transactions",
	{
		id: serial().primaryKey(),
		amount: moneyColumn.notNull(),
		subject: varchar({ length: TRANSACTION_MODEL_VALUES.subject.maxLength }),

		// Metadata
		description: varchar({
			length: TRANSACTION_MODEL_VALUES.description.maxLength,
		}),

		// Performed time
		performedAt: timestamp().notNull(),
		performedAtPrecision: timePrecisionEnum()
			.default(TimePrecision.DATETIME)
			.notNull(),

		// Category
		categoryId: integer().references(() => categoryTable.id, {
			onDelete: "set null",
		}),

		// Links
		accountId: integer()
			.notNull()
			.references(() => accountTable.id),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [
		// Indexes
		index("account_id_and_performed_at_and_id_idx").on(
			table.accountId,
			sql`${table.performedAt} DESC`,
			sql`${table.id} DESC`,
		),
		index("category_id_IDX").on(table.categoryId),
	],
);

export const TRANSACTIONS_TABLE_COLUMNS = {
	id: transactionsTable.id,
	amount: transactionsTable.amount,
	subject: transactionsTable.subject,
	description: transactionsTable.description,
	performedAt: transactionsTable.performedAt,
	performedAtPrecision: transactionsTable.performedAtPrecision,
	categoryId: transactionsTable.categoryId,
	accountId: transactionsTable.accountId,
	createdAt: transactionsTable.createdAt,
	updatedAt: transactionsTable.updatedAt,
};

/* Types */
export type TransactionsSelect = typeof transactionsTable.$inferSelect;
export type TransactionInsert = typeof transactionsTable.$inferInsert;
export type TransactionsUpdate = Partial<TransactionInsert>;
