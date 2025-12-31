import { BUDGET_SEGMENT_IMPUTATION_SCHEMA } from "@/features/budgets/imputation/budget-segment-imputation.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

/**
 * Budget Segment Auto Imputation History Model
 * Represents the history of automatic imputations for budget segment.
 */
export const BUDGET_SEGMENT_AUTO_IMPUTATION_HISTORY_SCHEMA = z.object({
	imputationId: BUDGET_SEGMENT_IMPUTATION_SCHEMA.shape.id, // Identifier

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});
export type BudgetSegmentAutoImputationHistoryModel = z.infer<
	typeof BUDGET_SEGMENT_AUTO_IMPUTATION_HISTORY_SCHEMA
>;

/* Create */
export const BUDGET_SEGMENT_AUTO_IMPUTATION_HISTORY_CREATE_SCHEMA =
	BUDGET_SEGMENT_AUTO_IMPUTATION_HISTORY_SCHEMA.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	});
export type BudgetSegmentAutoImputationHistoryCreateModel = z.infer<
	typeof BUDGET_SEGMENT_AUTO_IMPUTATION_HISTORY_CREATE_SCHEMA
>;
