import { DATE_SCHEMA } from "@/utils/date.model";
import z from "zod";

export const CASH_FLOW_SCHEMA = z.object({
	income: z.number(),
	outcome: z.number(),
});

export type CashFlowModel = z.infer<typeof CASH_FLOW_SCHEMA>;

/* Common variants */

export const MONTHLY_CASH_FLOW_SCHEMA = CASH_FLOW_SCHEMA.extend({
	date: DATE_SCHEMA,
	...CASH_FLOW_SCHEMA.shape,
});

export type MonthlyCashFlowModel = z.infer<typeof MONTHLY_CASH_FLOW_SCHEMA>;
