import { PgColumnBuilderBase } from "drizzle-orm/pg-core";

export type DbModeledColumnsDefinition<T extends object> = Record<
	keyof T,
	PgColumnBuilderBase
>;
