import { timestamps } from "@database/common/timestamps";
import { ROLE_MODEL_VALUES } from "@shared/models";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const roleTable = mysqlTable("role", {
  id: int().autoincrement().primaryKey(),
  name: varchar({
    length: ROLE_MODEL_VALUES.name.maxLength,
  }).notNull(),

  // Timestamps
  ...timestamps,
});

export type RoleInsert = typeof roleTable.$inferInsert;
export type RoleSelect = typeof roleTable.$inferSelect;
export type RoleUpdate = Partial<RoleInsert>;
