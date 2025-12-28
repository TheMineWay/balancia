import { ID_SCHEMA } from "@/common/__system/id.model";
import {
	MONEY_MODEL_VALUES,
	MONEY_SCHEMA,
} from "@/common/finances/money.model";
import { TimePrecision } from "@/common/time/time-precision.enum";
import { ACCOUNT_SCHEMA } from "@/features/finances/accounts/account.model";
import { CATEGORY_SCHEMA } from "@/features/finances/category/category.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const TRANSACTION_MODEL_VALUES = {
	subject: {
		maxLength: 255,
	},
	amount: {
		min: MONEY_MODEL_VALUES.money.min,
		max: MONEY_MODEL_VALUES.money.max,
	},
	performedAtPrecision: {
		default: TimePrecision.DATETIME,
	},
} satisfies ModelValues;

export const TRANSACTION_SCHEMA = z.object({
	id: ID_SCHEMA,
	amount: MONEY_SCHEMA,
	subject: z
		.string()
		.max(TRANSACTION_MODEL_VALUES.subject.maxLength)
		.nullable()
		.default(null),

	// When the transaction has been performed
	performedAt: DATE_SCHEMA,
	performedAtPrecision: z
		.enum(TimePrecision)
		.default(TRANSACTION_MODEL_VALUES.performedAtPrecision.default),

	// Links
	accountId: ACCOUNT_SCHEMA.shape.id,
	categoryId: CATEGORY_SCHEMA.shape.id.nullable().default(null),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type TransactionModel = z.infer<typeof TRANSACTION_SCHEMA>;

/* Create */
export const TRANSACTION_CREATE_SCHEMA = TRANSACTION_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export type TransactionCreateModel = z.infer<typeof TRANSACTION_CREATE_SCHEMA>;

/* Variants */

// Populated
export const TRANSACTION_POPULATED_SCHEMA = TRANSACTION_SCHEMA.extend({
	account: ACCOUNT_SCHEMA,
	category: CATEGORY_SCHEMA.nullable(),
});
export type TransactionPopulatedModel = z.infer<
	typeof TRANSACTION_POPULATED_SCHEMA
>;
