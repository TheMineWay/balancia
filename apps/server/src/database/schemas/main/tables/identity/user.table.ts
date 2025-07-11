import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import type { UserModel } from "@shared/models";
import { USER_MODEL_VALUES } from "@shared/models";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

type ColumnsModel = DbModeledColumnsDefinition<UserModel>;

export const userTable = mysqlTable("user", {
  id: int().autoincrement().primaryKey(),
  // Code is the unique identifier that comes from the OIDC provider
  code: varchar({ length: USER_MODEL_VALUES.code.maxLength })
    .unique()
    .notNull(),

  // Timestamps
  ...timestamps,
} satisfies ColumnsModel);

export type UserInsert = typeof userTable.$inferInsert;
export type UserSelect = typeof userTable.$inferSelect;
export type UserUpdate = Partial<UserInsert>;
