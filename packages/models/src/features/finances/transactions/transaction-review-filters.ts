import { ACCOUNT_SCHEMA } from "@/features/finances/accounts/account.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import z from "zod";

/* Filter */

export const TRANSACTION_REVIEW_FILTERS_SCHEMA = z
	.object({
		accountId: ACCOUNT_SCHEMA.shape.id.optional(),
		fromDate: DATE_SCHEMA.optional(),
		toDate: DATE_SCHEMA.optional(),
	})
	.refine((data) => {
		if (data.fromDate && data.toDate) {
			return data.fromDate <= data.toDate;
		}
		return true;
	});

export type TransactionReviewFiltersModel = z.infer<
	typeof TRANSACTION_REVIEW_FILTERS_SCHEMA
>;
