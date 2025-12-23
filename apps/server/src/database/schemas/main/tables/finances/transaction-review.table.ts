import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import {
	financesSchema,
	transactionsTable,
} from "@database/schemas/main.schema";
import { TransactionReviewModel } from "@shared/models";
import { serial, timestamp } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<TransactionReviewModel>;

export const transactionsReviewTable = financesSchema.table(
	"transactions_review",
	{
		transactionId: serial()
			.primaryKey()
			.references(() => transactionsTable.id, {
				onDelete: "cascade",
			}),
		reviewedAt: timestamp().defaultNow().notNull(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
);

export const TRANSACTIONS_REVIEW_TABLE_COLUMNS = {
	transactionId: transactionsReviewTable.transactionId,
	reviewedAt: transactionsReviewTable.reviewedAt,
	createdAt: transactionsReviewTable.createdAt,
	updatedAt: transactionsReviewTable.updatedAt,
};

export type TransactionsReviewSelect =
	typeof transactionsReviewTable.$inferSelect;
export type TransactionsReviewInsert =
	typeof transactionsReviewTable.$inferInsert;
export type TransactionsReviewUpdate = Partial<TransactionsReviewInsert>;
