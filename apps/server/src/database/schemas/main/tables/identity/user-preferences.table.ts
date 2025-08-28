import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import {
	accountTable,
	identitySchema,
	userTable,
} from "@database/schemas/main.schema";
import { UserPreferencesModel } from "@shared/models";
import { integer } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<UserPreferencesModel>;

export const userPreferencesTable = identitySchema.table("user_preferences", {
	userId: integer()
		.primaryKey()
		.references(() => userTable.id),

	// [ CONFIGS ]

	// Account
	mainAccount: integer().references(() => accountTable.id),

	// Timestamps
	...timestamps,
} satisfies ColumnsModel);

export const USER_PREFERENCES_TABLE_COLUMNS = {
	userId: userPreferencesTable.userId,
	mainAccount: userPreferencesTable.mainAccount,
};

/* Types */
export type UserPreferencesSelect = typeof userPreferencesTable.$inferSelect;
export type UserPreferencesInsert = typeof userPreferencesTable.$inferInsert;
export type UserPreferencesUpdate = Partial<UserPreferencesInsert>;
