import { timestamps } from "@database/common/timestamps";
import { identitySchema } from "@database/schemas/main.schema";
import { ROLE_MODEL_VALUES } from "@shared/models";
import { integer, varchar } from "drizzle-orm/pg-core";

export const roleTable = identitySchema.table("roles", {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	name: varchar({
		length: ROLE_MODEL_VALUES.name.maxLength,
	}).notNull(),

	// Timestamps
	...timestamps,
});

export type RoleInsert = typeof roleTable.$inferInsert;
export type RoleSelect = typeof roleTable.$inferSelect;
export type RoleUpdate = Partial<RoleInsert>;
