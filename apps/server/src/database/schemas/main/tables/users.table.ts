import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import type { UserModel } from "@shared/models";
import { USER_MODEL_VALUES } from "@shared/models";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

type ColumnsModel = DbModeledColumnsDefinition<UserModel>;

export const usersTable = mysqlTable("user", {
  id: int().autoincrement().primaryKey(),
  // Code is the unique identifier that comes from the OIDC provider
  code: varchar({ length: USER_MODEL_VALUES.code.maxLength })
    .unique()
    .notNull(),

  // Props
  name: varchar({ length: USER_MODEL_VALUES.name.maxLength }).notNull(),
  lastName: varchar({ length: USER_MODEL_VALUES.lastName.maxLength }).notNull(),
  username: varchar({ length: USER_MODEL_VALUES.username.maxLength })
    .unique()
    .notNull(),
  email: varchar({ length: USER_MODEL_VALUES.email.maxLength }),

  // Timestamps
  ...timestamps,
} satisfies ColumnsModel);

export type UserInsert = typeof usersTable.$inferInsert;
export type UserSelect = typeof usersTable.$inferSelect;
export type UserUpdate = Partial<UserInsert>;
