import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { tagTable } from "@database/schemas/main/tables/finances/tag.table";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import type { OwnedModel, TagAutomatcherModel } from "@shared/models";
import { index, integer, json } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<TagAutomatcherModel>>;

export const tagAutomatcherTable = financesSchema.table(
	"tag_automatchers",
	{
		tagId: integer()
			.notNull()
			.references(() => tagTable.id),
		criteria: json().$type<TagAutomatcherModel["criteria"]>().notNull(),

		// Owner
		userId: integer()
			.notNull()
			.references(() => userTable.id),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [index().on(table.userId, table.tagId)],
);
