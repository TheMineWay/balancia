import { timestamps } from "@database/common/timestamps";
import { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import { ACCOUNT_MODEL_VALUES, AccountModel, OwnedModel } from "@shared/models";
import { integer, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<AccountModel>>;

export const accountTable = financesSchema.table("accounts", {
	id: serial().primaryKey(),
	name: varchar({ length: ACCOUNT_MODEL_VALUES.name.maxLength }).notNull(),
	description: varchar({ length: ACCOUNT_MODEL_VALUES.description.maxLength }),

	// Links
	userId: integer()
		.notNull()
		.references(() => userTable.id),

	// Timestamps
	...timestamps,
} satisfies ColumnsModel);

export const ACCOUNT_TABLE_COLUMNS = {
	id: accountTable.id,
	name: accountTable.name,
	description: accountTable.description,
	userId: accountTable.userId,
	createdAt: accountTable.createdAt,
	updatedAt: accountTable.updatedAt,
};

/* Types */
export type AccountSelect = typeof accountTable.$inferSelect;
export type AccountInsert = typeof accountTable.$inferInsert;
export type AccountUpdate = Partial<AccountInsert>;
