import { TimePrecision } from "@shared/models";
import { pgEnum } from "drizzle-orm/pg-core";

export const timePrecisionEnum = pgEnum("time_precision", [
	TimePrecision.DATE,
	TimePrecision.DATETIME,
]);
