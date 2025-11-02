import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const MONEY_MODEL_VALUES = {
	money: {
		min: -99_999_999.99,
		max: 99_999_999.99,
	},
} satisfies ModelValues;

export const MONEY_SCHEMA = z
	.number()
	.multipleOf(0.01)
	.min(MONEY_MODEL_VALUES.money.min)
	.max(MONEY_MODEL_VALUES.money.max);

export type MoneyModel = z.infer<typeof MONEY_SCHEMA>;
