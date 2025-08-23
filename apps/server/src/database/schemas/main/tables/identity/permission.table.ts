import { timestamps } from "@database/common/timestamps";
import { identitySchema } from "@database/schemas/main.schema";
import type { Permission } from "@shared/models";
import { integer, varchar } from "drizzle-orm/pg-core";

export const permissionTable = identitySchema.table("permissions", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	code: varchar({ length: 64 }).unique().notNull().$type<Permission>(),

	// Timestamps (only createdAt is used)
	createdAt: timestamps.createdAt,
});

export type PermissionInsert = typeof permissionTable.$inferInsert;
export type PermissionSelect = typeof permissionTable.$inferSelect;
export type PermissionUpdate = Partial<PermissionInsert>;
