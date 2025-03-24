import { totpEnableTable } from "@database/schemas/main/tables/totp-enable.table";
import { totpRecoveryCodesTable } from "@database/schemas/main/tables/totp-recovery-codes.table";
import { usersTable } from "@database/schemas/main/tables/users.table";
// Tables
export const users = usersTable;
export const totpRecoveryCodes = totpRecoveryCodesTable;
export const totpEnable = totpEnableTable;
