import type { MySqlColumnBuilderBase } from "drizzle-orm/mysql-core";

export type DbModeledColumnsDefinition<T extends object> = Record<
	keyof T,
	MySqlColumnBuilderBase
>;
