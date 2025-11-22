import { ID_SCHEMA } from "@/common/__system/id.model";
import { MONEY_SCHEMA } from "@/common/finances/money.model";
import z from "zod";

export const DEBT_ORIGIN_SCHEMA = z.object({
	transactionId: ID_SCHEMA.nullable(),
	amount: MONEY_SCHEMA.positive(),
});

export type DebtOriginModel = z.infer<typeof DEBT_ORIGIN_SCHEMA>;
