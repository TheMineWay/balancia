import { ID_SCHEMA } from "@/common/__system/id.model";
import { TimePrecision } from "@/common/time/time-precision.enum";
import { CATEGORY_SCHEMA } from "@/money/transactions/category/category.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const TRANSACTION_MODEL_VALUES = {
	subject: {
		maxLength: 255,
	},
	amount: {
		min: -99_999_999.99,
		max: 99_999_999.99,
	},
	performedAtPrecision: {
		default: TimePrecision.DATETIME,
	},
} satisfies ModelValues;

export const TRANSACTION_SCHEMA = z.object({
	id: ID_SCHEMA,
	amount: z
		.number()
		.multipleOf(0.01)
		.min(TRANSACTION_MODEL_VALUES.amount.min)
		.max(TRANSACTION_MODEL_VALUES.amount.max),
	subject: z
		.string()
		.max(TRANSACTION_MODEL_VALUES.subject.maxLength)
		.nullable()
		.default(null),

	// When the transaction has been performed
	performedAt: z.date(),
	performedAtPrecision: z
		.enum(TimePrecision)
		.default(TRANSACTION_MODEL_VALUES.performedAtPrecision.default),

	// Category
	categoryId: CATEGORY_SCHEMA.shape.id.nullable().default(null),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type TransactionModel = z.infer<typeof TRANSACTION_SCHEMA>;

/* Create */
export const TRANSACTION_CREATE_SCHEMA = TRANSACTION_SCHEMA.omit({ id: true });
export type TransactionCreateModel = z.infer<typeof TRANSACTION_CREATE_SCHEMA>;
