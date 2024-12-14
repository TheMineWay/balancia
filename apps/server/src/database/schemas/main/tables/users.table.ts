import { timestamps } from "@database/common/mysql/timestamps";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("user", {
  id: int().autoincrement().primaryKey().notNull(),

  // Props
  name: varchar({ length: 64 }).notNull(),
  lastName: varchar({ length: 64 }).notNull(),
  username: varchar({ length: 32 }).unique().notNull(),

  // Timestamps
  ...timestamps,
});
