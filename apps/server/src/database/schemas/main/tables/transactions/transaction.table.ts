import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { timePrecisionEnum, userTable } from "@database/schemas/main.schema";
import { categoryTable } from "@database/schemas/main/tables/transactions/category.table";
import { transactionsSchema } from "@database/schemas/main/tables/transactions/transaction.schema";
import {
	type OwnedModel,
	TimePrecision,
	TRANSACTION_MODEL_VALUES,
	type TransactionModel,
} from "@shared/models";
import { sql } from "drizzle-orm";
import {
	decimal,
	index,
	integer,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<TransactionModel>>;

export const transactionsTable = transactionsSchema.table(
	"transactions",
	{
		id: serial().primaryKey(),
		amount: decimal({ precision: 10, scale: 2 }).notNull(),
		subject: varchar({ length: TRANSACTION_MODEL_VALUES.subject.maxLength }),

		// Performed time
		performedAt: timestamp().notNull(),
		performedAtPrecision: timePrecisionEnum()
			.default(TimePrecision.DATETIME)
			.notNull(),

		// Category
		categoryId: integer().references(() => categoryTable.id, {
			onDelete: "set null",
		}),

		// Owned
		userId: integer()
			.notNull()
			.references(() => userTable.id),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [
		// Indexes
		index("user_id_and_performed_at_IDX").on(
			table.userId,
			sql`${table.performedAt} DESC`,
		),
		index("category_id_IDX").on(table.categoryId),
	],
);

/* Types */
export type TransactionsSelect = typeof transactionsTable.$inferSelect;
export type TransactionInsert = typeof transactionsTable.$inferInsert;
export type TransactionsUpdate = Partial<TransactionInsert>;
