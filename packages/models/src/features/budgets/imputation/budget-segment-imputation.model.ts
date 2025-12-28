import { ID_SCHEMA } from "@/common/__system/id.model";
import { PERCENT_SCHEMA } from "@/common/numeric/percent.model";
import { BUDGET_SEGMENT_SCHEMA } from "@/features/budgets/budget-segment.model";
import { TRANSACTION_SCHEMA } from "@/features/finances/transactions/transaction.model";
import { nullableStringTransform } from "@/utils/nullable-string.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import { ModelValues } from "@ts-types/model-values.type";
import z from "zod";

export const BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES = {
	description: {
		maxLength: 1024,
	},
	percent: {
		default: 100,
	},
} satisfies ModelValues;

/**
 * Budget Segment Imputation Model
 * Represents the association between a budget segment and a transaction.
 */
export const BUDGET_SEGMENT_IMPUTATION_SCHEMA = z.object({
	id: ID_SCHEMA,

	// References
	segmentId: BUDGET_SEGMENT_SCHEMA.shape.id,
	transactionId: TRANSACTION_SCHEMA.shape.id,

	// Metadata
	percent: PERCENT_SCHEMA.default(
		BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES.percent.default,
	),
	description: z.preprocess(
		nullableStringTransform,
		z
			.string()
			.max(BUDGET_SEGMENT_IMPUTATION_MODEL_VALUES.description.maxLength)
			.nullable()
			.default(null),
	),

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});
export type BudgetSegmentImputationModel = z.infer<
	typeof BUDGET_SEGMENT_IMPUTATION_SCHEMA
>;

/* Create */
export const BUDGET_SEGMENT_IMPUTATION_CREATE_SCHEMA =
	BUDGET_SEGMENT_IMPUTATION_SCHEMA.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	});
export type BudgetSegmentImputationCreateModel = z.infer<
	typeof BUDGET_SEGMENT_IMPUTATION_CREATE_SCHEMA
>;
