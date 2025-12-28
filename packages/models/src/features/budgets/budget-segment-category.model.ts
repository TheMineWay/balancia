import { BUDGET_SEGMENT_SCHEMA } from "@/features/budgets/budget-segment.model";
import { CATEGORY_SCHEMA } from "@/features/finances/category/category.model";
import { TIMESTAMPS_SCHEMA } from "@/utils/timestamps.model";
import z from "zod";

export const BUDGET_SEGMENT_CATEGORY_SCHEMA = z.object({
	// Identifiers
	categoryId: CATEGORY_SCHEMA.shape.id,
	segmentId: BUDGET_SEGMENT_SCHEMA.shape.id,

	// Timestamps
	...TIMESTAMPS_SCHEMA.shape,
});

export type BudgetSegmentCategoryModel = z.infer<
	typeof BUDGET_SEGMENT_CATEGORY_SCHEMA
>;

/* Create */

export const BUDGET_SEGMENT_CATEGORY_CREATE_SCHEMA =
	BUDGET_SEGMENT_CATEGORY_SCHEMA.omit({
		createdAt: true,
		updatedAt: true,
	});

export type BudgetSegmentCategoryCreateModel = z.infer<
	typeof BUDGET_SEGMENT_CATEGORY_CREATE_SCHEMA
>;
