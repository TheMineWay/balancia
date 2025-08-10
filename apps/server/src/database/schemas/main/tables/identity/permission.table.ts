import { timestamps } from "@database/common/timestamps";
import type { Permission } from "@shared/models";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const permissionTable = mysqlTable("permission", {
	id: int().autoincrement().primaryKey(),
	code: varchar({ length: 64 }).unique().notNull().$type<Permission>(),

	// Timestamps (only createdAt is used)
	createdAt: timestamps.createdAt,
});

export type PermissionInsert = typeof permissionTable.$inferInsert;
export type PermissionSelect = typeof permissionTable.$inferSelect;
export type PermissionUpdate = Partial<PermissionInsert>;
