import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { tagTable } from "@database/schemas/main/tables/finances/tag.table";
import {
	AUTO_ASSIGN_METADATA_MODEL_VALUES,
	type TagAutomatcherModel,
} from "@shared/models";
import { index, integer, json, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<TagAutomatcherModel>;

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

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [index().on(table.tagId)],
);

export const TAG_AUTOMATCHER_TABLE_COLUMNS = {
	id: tagAutomatcherTable.id,
	name: tagAutomatcherTable.name,
	description: tagAutomatcherTable.description,
	tagId: tagAutomatcherTable.tagId,
	criteria: tagAutomatcherTable.criteria,
	createdAt: tagAutomatcherTable.createdAt,
	updatedAt: tagAutomatcherTable.updatedAt,
};

/* Types */
export type TagAutomatcherSelect = typeof tagAutomatcherTable.$inferSelect;
export type TagAutomatcherInsert = typeof tagAutomatcherTable.$inferInsert;
export type TagAutomatcherUpdate = Partial<TagAutomatcherInsert>;
