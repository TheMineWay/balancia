import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { USER_MODEL_VALUES, UserModel } from "@shared/models";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

type ColumnsModel = DbModeledColumnsDefinition<
  UserModel & { password: string; totpSecret: string | null }
>;

export const usersTable = mysqlTable("user", {
  id: int().autoincrement().primaryKey(),

  // Props
  name: varchar({ length: USER_MODEL_VALUES.name.maxLength }).notNull(),
  lastName: varchar({ length: USER_MODEL_VALUES.lastName.maxLength }).notNull(),
  username: varchar({ length: USER_MODEL_VALUES.username.maxLength })
    .unique()
    .notNull(),
  email: varchar({ length: USER_MODEL_VALUES.email.maxLength }).unique(),
  password: varchar({ length: 512 }).notNull(),
  totpSecret: varchar({ length: 128 }),

  // Timestamps
  ...timestamps,
} satisfies ColumnsModel);

export type UserInsert = InferInsertModel<typeof usersTable>;
export type UserSelect = InferSelectModel<typeof usersTable>;
