import { timestamps } from "@database/common/timestamps";
import { permissionTable } from "@database/schemas/main/tables/identity/permission.table";
import { roleTable } from "@database/schemas/main/tables/identity/role.table";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

const TABLE_NAME = "role_permission";

export const rolePermissionTable = mysqlTable(
	TABLE_NAME,
	{
		roleId: int()
			.notNull()
			.references(() => roleTable.id, { onDelete: "cascade" }),
		permissionId: int()
			.notNull()
			.references(() => permissionTable.id, { onDelete: "cascade" }),

		// Timestamps (only createdAt is used)
		createdAt: timestamps.createdAt,
	},
	(table) => [
		primaryKey({ columns: [table.roleId, table.permissionId] }),
		index(`${TABLE_NAME}_${table.roleId.name}_idx`).on(table.roleId),
		index(`${TABLE_NAME}_${table.permissionId.name}_idx`).on(
			table.permissionId,
		),
	],
);

export type RolePermissionInsert = typeof rolePermissionTable.$inferInsert;
export type RolePermissionSelect = typeof rolePermissionTable.$inferSelect;
export type RolePermissionUpdate = Partial<RolePermissionInsert>;
