import { DATE_SCHEMA } from "@/utils/date.model";
import z from "zod";

export const BUDGET_FILTERS_SCHEMA = z.object({
	/**
	 * Date filters do not match to budget date fields.
	 * When filtering by dates the system returns budgets that overlap with the given date range.
	 */
	fromDate: DATE_SCHEMA.optional(),
	toDate: DATE_SCHEMA.optional(),
});
export type BudgetFiltersModel = z.infer<typeof BUDGET_FILTERS_SCHEMA>;
