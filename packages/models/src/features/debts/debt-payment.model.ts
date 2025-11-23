import { ID_SCHEMA } from "@/common/__system/id.model";
import { MONEY_SCHEMA } from "@/common/finances/money.model";
import { DEBT_SCHEMA } from "@/features/debts/debt.model";
import { TRANSACTION_SCHEMA } from "@/features/finances/transactions/transaction.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import { nullableStringTransform } from "@/utils/nullable-string.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const DEBT_PAYMENT_MODEL_VALUES = {
	notes: {
		maxLength: 512,
	},
} satisfies ModelValues;

export const DEBT_PAYMENT_SCHEMA = z.object({
	id: ID_SCHEMA,
	transactionId: TRANSACTION_SCHEMA.shape.id.nullable(),
	debtId: DEBT_SCHEMA.shape.id,

	// Metadata
	amount: MONEY_SCHEMA.positive(),
	paidAt: DATE_SCHEMA,
	notes: z.preprocess(
		nullableStringTransform,
		z
			.string()
			.max(DEBT_PAYMENT_MODEL_VALUES.notes.maxLength)
			.nullable()
			.default(null),
	),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type DebtPaymentModel = z.infer<typeof DEBT_PAYMENT_SCHEMA>;

// Create

export const CREATE_DEBT_PAYMENT_SCHEMA = DEBT_PAYMENT_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type DebtPaymentCreateModel = z.infer<typeof CREATE_DEBT_PAYMENT_SCHEMA>;
