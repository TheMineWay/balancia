import { ID_SCHEMA } from "@/common/__system/id.model";
import { DATE_SCHEMA } from "@/utils/date.model";
import z from "zod";

export const ACCOUNT_MONTHLY_STATS_SCHEMA = z.object({
	accountId: ID_SCHEMA,
	userId: ID_SCHEMA,
	date: DATE_SCHEMA,
	monthlyBalance: z.number(),
	income: z.number(),
	outcome: z.number(),
});

export type AccountMonthlyStatsModel = z.infer<
	typeof ACCOUNT_MONTHLY_STATS_SCHEMA
>;
