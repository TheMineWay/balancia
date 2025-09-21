import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { tagTable } from "@database/schemas/main/tables/finances/tag.table";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import {
	AUTO_ASSIGN_METADATA_MODEL_VALUES,
	type OwnedModel,
	type TagAutomatcherModel,
} from "@shared/models";
import { index, integer, json, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<TagAutomatcherModel>>;

export const tagAutomatcherTable = financesSchema.table(
	"tag_automatchers",
	{
		id: serial().primaryKey(),

		// Metadata
		name: varchar({
			length: AUTO_ASSIGN_METADATA_MODEL_VALUES.name.maxLength,
		}).notNull(),
		description: varchar({
			length: AUTO_ASSIGN_METADATA_MODEL_VALUES.description.maxLength,
		}),

		// Matcher metadata
		tagId: integer()
			.notNull()
			.references(() => tagTable.id, { onDelete: "cascade" }),
		criteria: json().$type<TagAutomatcherModel["criteria"]>().notNull(),

		// Owner
		userId: integer()
			.notNull()
			.references(() => userTable.id, { onDelete: "cascade" }),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [index().on(table.userId, table.tagId)],
);
