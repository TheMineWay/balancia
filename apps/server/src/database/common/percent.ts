import { Column, sql } from "drizzle-orm";
import { smallint } from "drizzle-orm/pg-core";

export const percentColumn = smallint();

export const percentColumnCheck = (column: Column) =>
	sql`${column} >= 0 AND ${column} <= 100`;
