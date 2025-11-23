import { ID_SCHEMA } from "@/common/__system/id.model";
import { MONEY_SCHEMA } from "@/common/finances/money.model";
import { nullableStringTransform } from "@/utils/nullable-string.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const DEBT_ORIGIN_MODEL_VALUES = {
	notes: {
		maxLength: 512,
	},
} satisfies ModelValues;

export const DEBT_ORIGIN_SCHEMA = z.object({
	transactionId: ID_SCHEMA.nullable(),
	amount: MONEY_SCHEMA.positive(),
	notes: z.preprocess(
		nullableStringTransform,
		z
			.string()
			.max(DEBT_ORIGIN_MODEL_VALUES.notes.maxLength)
			.nullable()
			.default(null),
	),
});

export type DebtOriginModel = z.infer<typeof DEBT_ORIGIN_SCHEMA>;

export const DEBT_ORIGIN_CREATE_SCHEMA = DEBT_ORIGIN_SCHEMA;

export type DebtOriginCreateModel = z.infer<typeof DEBT_ORIGIN_CREATE_SCHEMA>;
