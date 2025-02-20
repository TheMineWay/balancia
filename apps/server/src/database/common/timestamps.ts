import { timestamp } from "drizzle-orm/mysql-core";

export const timestamps = {
  createdAt: timestamp().defaultNow()
    .notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdateFn(() => new Date(Date.now()))
    .notNull(),
};
