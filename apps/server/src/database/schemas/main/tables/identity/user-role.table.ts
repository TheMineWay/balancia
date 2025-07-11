import { timestamps } from "@database/common/timestamps";
import { roleTable } from "@database/schemas/main/tables/identity/role.table";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

export const userRoleTable = mysqlTable(
  "user_role",
  {
    userId: int()
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    roleId: int()
      .notNull()
      .references(() => roleTable.id, { onDelete: "cascade" }),

    // Timestamps
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })],
);

export type UserRoleInsert = typeof userRoleTable.$inferInsert;
export type UserRoleSelect = typeof userRoleTable.$inferSelect;
export type UserRoleUpdate = Partial<UserRoleInsert>;
