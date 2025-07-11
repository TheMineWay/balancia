import { timestamps } from "@database/common/timestamps";
import { permissionTable } from "@database/schemas/main/tables/identity/permission.table";
import { roleTable } from "@database/schemas/main/tables/identity/role.table";
import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

export const rolePermissionTable = mysqlTable(
  "role_permission",
  {
    roleId: int()
      .notNull()
      .references(() => roleTable.id, { onDelete: "cascade" }),
    permissionId: int()
      .notNull()
      .references(() => permissionTable.id, { onDelete: "cascade" }),

    // Timestamps
    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export type RolePermissionInsert = typeof rolePermissionTable.$inferInsert;
export type RolePermissionSelect = typeof rolePermissionTable.$inferSelect;
export type RolePermissionUpdate = Partial<RolePermissionInsert>;
