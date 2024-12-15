import { sql } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";

export const timestamps = {
  createdAt: datetime()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: datetime()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
};
