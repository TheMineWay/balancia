import { ID_SCHEMA } from "@/common/__system/id.model";
import { DEBT_SCHEMA } from "@/features/debts/debt.model";
import { TRANSACTION_SCHEMA } from "@/features/finances/transactions/transaction.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

export const DEBT_PAYMENT_SCHEMA = z.object({
	id: ID_SCHEMA,
	transactionId: TRANSACTION_SCHEMA.shape.id,
	debtId: DEBT_SCHEMA.shape.id,

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
