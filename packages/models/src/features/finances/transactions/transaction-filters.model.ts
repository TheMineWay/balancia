import { NULLABLE_ID_SCHEMA } from "@/common/__system/nullable-id.model";
import { TRANSACTION_SCHEMA } from "@/features/finances/transactions/transaction.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import z from "zod";

export const TRANSACTION_FILTERS_SCHEMA = z.object({
	accountId: TRANSACTION_SCHEMA.shape.accountId.optional(),
	categoryId: NULLABLE_ID_SCHEMA.nullish(),
	fromDate: DATE_SCHEMA.optional(),
	toDate: DATE_SCHEMA.optional(),
});

export type TransactionFiltersModel = z.infer<
	typeof TRANSACTION_FILTERS_SCHEMA
>;
