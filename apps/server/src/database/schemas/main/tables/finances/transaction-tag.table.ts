import { timestamps } from "@database/common/timestamps";
import { transactionsTable } from "@database/schemas/main.schema";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { tagTable } from "@database/schemas/main/tables/finances/tag.table";
import { integer, primaryKey } from "drizzle-orm/pg-core";

export const transactionTag = financesSchema.table(
	"transaction_tags",
	{
		transactionId: integer()
			.notNull()
			.references(() => transactionsTable.id, { onDelete: "cascade" }),
		tagId: integer()
			.notNull()
			.references(() => tagTable.id, { onDelete: "cascade" }),

		// Timestamps
		createdAt: timestamps.createdAt,
	},
	(table) => [primaryKey({ columns: [table.transactionId, table.tagId] })],
);

/* Types */
export type TransactionTagSelect = typeof transactionTag.$inferSelect;
export type TransactionTagInsert = typeof transactionTag.$inferInsert;
export type TransactionTagUpdate = Partial<TransactionTagInsert>;
