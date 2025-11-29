import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { socialSchema, userTable } from "@database/schemas/main.schema";
import { OwnedModel, UserSocialConfigsModel } from "@shared/models";
import { integer } from "drizzle-orm/pg-core";

/* Table */

type ColumnsModel = DbModeledColumnsDefinition<
	OwnedModel<UserSocialConfigsModel>
>;

export const userSocialConfigTable = socialSchema.table("user_social_configs", {
	userId: integer()
		.primaryKey()
		.references(() => userTable.id),

	// Configs

	// Timestamps
	...timestamps,
} satisfies ColumnsModel);

/* Types */
export type UserSocialConfigsSelect = typeof userSocialConfigTable.$inferSelect;
export type UserSocialConfigsInsert = typeof userSocialConfigTable.$inferInsert;
export type UserSocialConfigsUpdate = Partial<UserSocialConfigsInsert>;
