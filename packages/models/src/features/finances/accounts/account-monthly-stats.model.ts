import { ID_SCHEMA } from "@/common/__system/id.model";
import z from "zod";

export const ACCOUNT_MONTHLY_STATS_SCHEMA = z.object({
	accountId: ID_SCHEMA,
	year: z.number().positive(),
	month: z.number().min(1).max(12),
	monthlyBalance: z.number(),
	income: z.number(),
	outcome: z.number(),
});

export type AccountMonthlyStatsModel = z.infer<
	typeof ACCOUNT_MONTHLY_STATS_SCHEMA
>;
