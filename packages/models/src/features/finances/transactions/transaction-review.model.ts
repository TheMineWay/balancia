import { ID_SCHEMA } from "@/common/__system/id.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const TRANSACTION_REVIEW_MODEL_VALUES = {} satisfies ModelValues;

/* Model */

export const TRANSACTION_REVIEW_SCHEMA = z.object({
	transactionId: ID_SCHEMA, // Identifier, as there is one review per transaction
	reviewedAt: DATE_SCHEMA,

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type TransactionReviewModel = z.infer<typeof TRANSACTION_REVIEW_SCHEMA>;

/* Create */

export const TRANSACTION_REVIEW_CREATE_SCHEMA = TRANSACTION_REVIEW_SCHEMA.omit({
	transactionId: true,
	createdAt: true,
	updatedAt: true,
});

export type TransactionReviewCreateModel = z.infer<
	typeof TRANSACTION_REVIEW_CREATE_SCHEMA
>;
