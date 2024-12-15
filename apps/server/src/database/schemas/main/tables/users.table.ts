import { timestamps } from "@database/common/timestamps";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("user", {
  id: int().autoincrement().primaryKey(),

  // Props
  name: varchar({ length: 64 }).notNull(),
  lastName: varchar({ length: 64 }).notNull(),
  username: varchar({ length: 32 }).unique().notNull(),
  password: varchar({ length: 512 }).notNull(),

  // Timestamps
  ...timestamps,
});

export type UserInsert = InferInsertModel<typeof usersTable>;
export type UserSelect = InferSelectModel<typeof usersTable>;
