import { timestamps } from "@database/common/timestamps";
import { usersTable } from "@database/schemas/main/tables/users.table";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const totpEnableTable = mysqlTable("totp-enable", {
  userId: int()
    .primaryKey()
    .notNull()
    .references(() => usersTable.id),
  totpSecret: varchar({ length: 128 }).notNull(),

  // Timestamps
  createdAt: timestamps.createdAt,
});

export type TotpEnableInsert = InferInsertModel<typeof totpEnableTable>;
export type TotpEnableSelect = InferSelectModel<typeof totpEnableTable>;
