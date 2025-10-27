import { CATEGORY_SCHEMA } from "@/features/finances/category/category.model";
import z from "zod";

export const CATEGORY_EXPENSES_MODEL_SCHEMA = z.object({
	category: z.nullable(CATEGORY_SCHEMA),
	outcome: z.number(),
});

export type CategoryExpensesModel = z.infer<
	typeof CATEGORY_EXPENSES_MODEL_SCHEMA
>;
