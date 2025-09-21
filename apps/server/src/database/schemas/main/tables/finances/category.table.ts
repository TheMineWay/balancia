import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { userTable } from "@database/schemas/main.schema";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import {
	CATEGORY_MODEL_VALUES,
	type CategoryModel,
	type OwnedModel,
} from "@shared/models";
import { index, integer, serial, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<CategoryModel>>;

export const categoryTable = financesSchema.table(
	"categories",
	{
		id: serial().primaryKey(),
		name: varchar({ length: CATEGORY_MODEL_VALUES.name.maxLength }).notNull(),
		description: varchar({
			length: CATEGORY_MODEL_VALUES.description.maxLength,
		}),

		// Owner
		userId: integer()
			.notNull()
			.references(() => userTable.id),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [index().on(table.userId)],
);

export const CATEGORY_TABLE_COLUMNS = {
	id: categoryTable.id,
	name: categoryTable.name,
	description: categoryTable.description,
	userId: categoryTable.userId,
	createdAt: categoryTable.createdAt,
	updatedAt: categoryTable.updatedAt,
};

/* Types */
export type CategorySelect = typeof categoryTable.$inferSelect;
export type CategoryInsert = typeof categoryTable.$inferInsert;
export type CategoryUpdate = Partial<CategoryInsert>;
