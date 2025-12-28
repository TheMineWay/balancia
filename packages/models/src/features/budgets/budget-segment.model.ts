import { ID_SCHEMA } from "@/common/__system/id.model";
import { BUDGET_SCHEMA } from "@/features/budgets/budget.model";
import { nullableStringTransform } from "@/utils/nullable-string.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import type { ModelValues } from "@ts-types/model-values.type";
import z from "zod";
import { PERCENT_SCHEMA } from "../../common/numeric/percent.model";

export const BUDGET_SEGMENT_MODEL_VALUES = {
	name: {
		minLength: 3,
		maxLength: 256,
	},
	description: {
		maxLength: 2048,
	},
} satisfies ModelValues;

/* Model */

export const BUDGET_SEGMENT_SCHEMA = z.object({
	id: ID_SCHEMA,
	budgetId: BUDGET_SCHEMA.shape.id,

	// Metadata
	name: z
		.string()
		.min(BUDGET_SEGMENT_MODEL_VALUES.name.minLength)
		.max(BUDGET_SEGMENT_MODEL_VALUES.name.maxLength),
	description: z.preprocess(
		nullableStringTransform,
		z
			.string()
			.max(BUDGET_SEGMENT_MODEL_VALUES.description.maxLength)
			.nullable()
			.default(null),
	),
	percent: PERCENT_SCHEMA,

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type BudgetSegmentModel = z.infer<typeof BUDGET_SEGMENT_SCHEMA>;

/* Create */

export const BUDGET_SEGMENT_CREATE_SCHEMA = BUDGET_SEGMENT_SCHEMA.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export type BudgetSegmentCreateModel = z.infer<
	typeof BUDGET_SEGMENT_CREATE_SCHEMA
>;
