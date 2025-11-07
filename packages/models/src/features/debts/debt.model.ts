import { ID_SCHEMA } from "@/common/__system/id.model";
import { MONEY_SCHEMA } from "@/common/finances/money.model";
import { CONTACT_SCHEMA } from "@/features/social/contact/contact.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import { nullableStringTransform } from "@/utils/nullable-string.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const DEBT_MODEL_VALUES = {
	reason: {
		maxLength: 2048,
	},
} satisfies ModelValues;

export const DEBT_SCHEMA = z.object({
	id: ID_SCHEMA,
	debtorId: CONTACT_SCHEMA.shape.id, // Who owes the money
	userId: ID_SCHEMA, // Owner of the debt

	// Metadata
	amount: MONEY_SCHEMA.positive(),
	reason: z
		.preprocess(
			nullableStringTransform,
			z.string().max(DEBT_MODEL_VALUES.reason.maxLength).nullable(),
		)
		.default(null),

	notifiedAt: DATE_SCHEMA.nullable(), // Indicates when has the debt been communicated. If null, it means it has not been communicated yet
	...TIMESTAMPS_SCHEMA.shape,
});

export type DebtModel = z.infer<typeof DEBT_SCHEMA>;

// Create

export const DEBT_CREATE_SCHEMA = DEBT_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type DebtCreateModel = z.infer<typeof DEBT_CREATE_SCHEMA>;

/* List */

export const DEBT_LIST_SCHEMA = z.object({
	...DEBT_SCHEMA.shape,
	debtor: CONTACT_SCHEMA.required(),
});

export type DebtListModel = z.infer<typeof DEBT_LIST_SCHEMA>;
