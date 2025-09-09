import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { userTable } from "@database/schemas/main.schema";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import {
	type OwnedModel,
	TAG_MODEL_VALUES,
	type TagModel,
} from "@shared/models";
import { index, integer, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<TagModel>>;

export const tagTable = financesSchema.table(
	"tags",
	{
		id: serial().primaryKey(),
		name: varchar({ length: TAG_MODEL_VALUES.name.maxLength }).notNull(),
		description: varchar({ length: TAG_MODEL_VALUES.description.maxLength }),

		// Owner
		userId: integer()
			.notNull()
			.references(() => userTable.id),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [index().on(table.userId)],
);

export const TAG_TABLE_COLUMNS = {
	id: tagTable.id,
	name: tagTable.name,
	description: tagTable.description,
	userId: tagTable.userId,
	createdAt: tagTable.createdAt,
	updatedAt: tagTable.updatedAt,
};

/* Types */
export type TagSelect = typeof tagTable.$inferSelect;
export type TagInsert = typeof tagTable.$inferInsert;
export type TagUpdate = Partial<TagInsert>;
