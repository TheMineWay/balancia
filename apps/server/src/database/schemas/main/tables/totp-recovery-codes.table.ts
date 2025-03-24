import { timestamps } from "@database/common/timestamps";
import { usersTable } from "@database/schemas/main/tables/users.table";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";

export const totpRecoveryCodesTable = mysqlTable(
  "totp-recovery-codes",
  {
    userId: int()
      .notNull()
      .references(() => usersTable.id),
    code: varchar({ length: 12 }).notNull(),

    // Timestamps
    createdAt: timestamps.createdAt,
  },
  (t) => ({
    uniqueUserCode: unique().on(t.userId, t.code),
  }),
);

export type TotpRecoveryCodesInsert = InferInsertModel<
  typeof totpRecoveryCodesTable
>;
export type TotpRecoveryCodesSelect = InferSelectModel<
  typeof totpRecoveryCodesTable
>;
