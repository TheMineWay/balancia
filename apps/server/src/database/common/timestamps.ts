import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp()
		.defaultNow()
		.$onUpdateFn(() => new Date(Date.now()))
		.notNull(),
};
