import { timestamps } from "@database/common/timestamps";
import { identitySchema } from "@database/schemas/main/tables/identity/identity.schema";
import { roleTable } from "@database/schemas/main/tables/identity/role.table";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import { integer, primaryKey } from "drizzle-orm/pg-core";

export const userRoleTable = identitySchema.table(
	"user_roles",
	{
		userId: integer()
			.notNull()
			.references(() => userTable.id, { onDelete: "cascade" }),
		roleId: integer()
			.notNull()
			.references(() => roleTable.id, { onDelete: "cascade" }),

		// Timestamps (only createdAt is used)
		createdAt: timestamps.createdAt,
	},
	(table) => [primaryKey({ columns: [table.userId, table.roleId] })],
);

export type UserRoleInsert = typeof userRoleTable.$inferInsert;
export type UserRoleSelect = typeof userRoleTable.$inferSelect;
export type UserRoleUpdate = Partial<UserRoleInsert>;
