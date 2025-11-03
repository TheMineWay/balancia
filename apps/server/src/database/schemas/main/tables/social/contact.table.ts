import { timestamps } from "@database/common/timestamps";
import type { DbModeledColumnsDefinition } from "@database/schemas/db-modeled-columns-definition.type";
import { userTable } from "@database/schemas/main/tables/identity/user.table";
import { socialSchema } from "@database/schemas/main/tables/social/social.schema";
import {
	CONTACT_MODEL_VALUES,
	type ContactModel,
	type OwnedModel,
} from "@shared/models";
import { sql } from "drizzle-orm";
import { integer, serial, unique, varchar } from "drizzle-orm/pg-core";

type ColumnsModel = DbModeledColumnsDefinition<OwnedModel<ContactModel>>;

export const contactTable = socialSchema.table(
	"contacts",
	{
		id: serial().primaryKey(),
		code: varchar({ length: CONTACT_MODEL_VALUES.code.maxLength })
			.notNull()
			.default(sql`gen_random_uuid()`),
		name: varchar({ length: CONTACT_MODEL_VALUES.name.maxLength }).notNull(),
		lastName: varchar({ length: CONTACT_MODEL_VALUES.lastName.maxLength }),
		email: varchar({ length: CONTACT_MODEL_VALUES.email.maxLength }),
		phone: varchar({ length: CONTACT_MODEL_VALUES.phone.maxLength }),

		// Owner
		userId: integer()
			.references(() => userTable.id)
			.notNull(),

		// Timestamps
		...timestamps,
	} satisfies ColumnsModel,
	(table) => [unique().on(table.userId, table.code)],
);

export const CONTACT_TABLE_COLUMNS = {
	id: contactTable.id,
	name: contactTable.name,
	lastName: contactTable.lastName,
	email: contactTable.email,
	phone: contactTable.phone,
	code: contactTable.code,
	userId: contactTable.userId,
};

/* Types */
export type ContactSelect = typeof contactTable.$inferSelect;
export type ContactInsert = typeof contactTable.$inferInsert;
export type ContactUpdate = Partial<ContactInsert>;
