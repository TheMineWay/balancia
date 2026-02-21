import { DATE_SCHEMA } from "@/utils/date.model";
import z from "zod";

export const BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_RUN_MATCHERS_FILTERS_SCHEMA =
	z.object({
		fromDate: DATE_SCHEMA.optional(),
		toDate: DATE_SCHEMA.optional(),
	});

export type BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel = z.infer<
	typeof BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_RUN_MATCHERS_FILTERS_SCHEMA
>;
