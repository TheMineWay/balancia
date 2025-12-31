import { ID_SCHEMA } from "@/common/__system/id.model";
import { MONEY_SCHEMA } from "@/common/finances/money.model";
import { USER_SCHEMA } from "@/core/user/user.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import { nullableStringTransform } from "@/utils/nullable-string.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
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
export const BUDGET_CREATE_SCHEMA = BUDGET_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export type BudgetCreateModel = z.infer<typeof BUDGET_CREATE_SCHEMA>;
