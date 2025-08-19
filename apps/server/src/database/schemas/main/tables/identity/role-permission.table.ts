import { timestamps } from "@database/common/timestamps";
import { identitySchema } from "@database/schemas/main.schema";
import { permissionTable } from "@database/schemas/main/tables/identity/permission.table";
import { roleTable } from "@database/schemas/main/tables/identity/role.table";
import { index, integer, primaryKey } from "drizzle-orm/pg-core";

const TABLE_NAME = "role_permissions";

export const rolePermissionTable = identitySchema.table(
	TABLE_NAME,
	{
		roleId: integer()
			.notNull()
			.references(() => roleTable.id, { onDelete: "cascade" }),
		permissionId: integer()
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
