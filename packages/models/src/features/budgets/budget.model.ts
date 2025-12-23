import {
	DATE_SCHEMA,
	ID_SCHEMA,
	MONEY_SCHEMA,
	nullableStringTransform,
	TIMESTAMPS_SCHEMA,
	USER_SCHEMA,
	type ModelValues,
} from "@shared/models";
import z from "zod";

export const BUDGET_MODEL_VALUES = {
	name: {
		minLength: 5,
		maxLength: 256,
	},
	description: {
		maxLength: 4096,
	},
} satisfies ModelValues;

export const BUDGET_SCHEMA = z
	.object({
		id: ID_SCHEMA,
		userId: USER_SCHEMA.shape.id,

		// Essentials
		fromDate: DATE_SCHEMA,
		toDate: DATE_SCHEMA,
		name: z
			.string()
			.min(BUDGET_MODEL_VALUES.name.minLength)
			.max(BUDGET_MODEL_VALUES.name.maxLength),
		description: z.preprocess(
			nullableStringTransform,
			z
				.string()
				.max(BUDGET_MODEL_VALUES.description.maxLength)
				.nullable()
				.default(null),
		),

		amount: MONEY_SCHEMA.positive(),

		// Timestamps
		...TIMESTAMPS_SCHEMA.shape,
	})
	.refine((data) => {
		return data.fromDate <= data.toDate;
	});

export type BudgetModel = z.infer<typeof BUDGET_SCHEMA>;

/* Create */
export const BUDGET_CREATE_SCHEMA = BUDGET_SCHEMA.pick({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export type BudgetCreateModel = z.infer<typeof BUDGET_CREATE_SCHEMA>;
