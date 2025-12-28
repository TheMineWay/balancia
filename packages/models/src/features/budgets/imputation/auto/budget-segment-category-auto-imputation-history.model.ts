import { BUDGET_SEGMENT_IMPUTATION_SCHEMA } from "@/features/budgets/imputation/budget-segment-imputation.model";
import { CATEGORY_SCHEMA } from "@/features/finances/category/category.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

/**
 * Budget Segment Auto Imputation History Model
 * Represents the history of automatic imputations for budget segment by categories.
 */
export const BUDGET_SEGMENT_CATEGORY_AUTO_IMPUTATION_HISTORY_SCHEMA = z.object({
	historyImputationId: BUDGET_SEGMENT_IMPUTATION_SCHEMA.shape.id, // Identifier
	categoryId: CATEGORY_SCHEMA.shape.id,

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});
export type BudgetSegmentCategoryAutoImputationHistoryModel = z.infer<
	typeof BUDGET_SEGMENT_CATEGORY_AUTO_IMPUTATION_HISTORY_SCHEMA
>;

/* Create */
export const BUDGET_SEGMENT_CATEGORY_AUTO_IMPUTATION_HISTORY_CREATE_SCHEMA =
	BUDGET_SEGMENT_CATEGORY_AUTO_IMPUTATION_HISTORY_SCHEMA.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	});
export type BudgetSegmentCategoryAutoImputationHistoryCreateModel = z.infer<
	typeof BUDGET_SEGMENT_CATEGORY_AUTO_IMPUTATION_HISTORY_CREATE_SCHEMA
>;
