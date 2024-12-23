import { MySqlColumnBuilderBase } from "drizzle-orm/mysql-core";

export type DbModeledColumnsDefinition<T extends Object> = Record<
  keyof T,
  MySqlColumnBuilderBase
>;
