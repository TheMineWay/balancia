import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { socialSchema, userTable } from "@database/schemas/main.schema";
import {
	ContactCodeGenerationStrategy,
	OwnedModel,
	USER_SOCIAL_CONFIGS_MODEL_VALUES,
	UserSocialConfigsModel,
} from "@shared/models";
import { integer } from "drizzle-orm/pg-core";

/* Enums */

export const contactCodeGenerationStrategyEnum = socialSchema.enum(
	"contact_code_generation_strategy",
	[ContactCodeGenerationStrategy.UUID, ContactCodeGenerationStrategy.NAME_HASH],
);

/* Table */

type ColumnsModel = DbModeledColumnsDefinition<
	OwnedModel<UserSocialConfigsModel>
>;

export const userSocialConfigTable = socialSchema.table("user_social_configs", {
	userId: integer()
		.primaryKey()
		.references(() => userTable.id),

	// Configs
	contactCodeGenerationStrategy: contactCodeGenerationStrategyEnum()
		.notNull()
		.default(
			USER_SOCIAL_CONFIGS_MODEL_VALUES.contactCodeGenerationStrategy.default,
		),

	// Timestamps
	...timestamps,
} satisfies ColumnsModel);

/* Types */
export type UserSocialConfigsSelect = typeof userSocialConfigTable.$inferSelect;
export type UserSocialConfigsInsert = typeof userSocialConfigTable.$inferInsert;
export type UserSocialConfigsUpdate = Partial<UserSocialConfigsInsert>;
