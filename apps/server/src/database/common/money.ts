import { decimal } from "drizzle-orm/pg-core";

export const moneyColumn = decimal({ precision: 10, scale: 2, mode: "number" });
