// Identity

export { timePrecisionEnum } from "@database/schemas/main/enums/time-precision.db-enum";
export { debtOriginTable as debtOriginalTransactionTable } from "@database/schemas/main/tables/debt/debt-origin.table";
export { debtPaymentTable } from "@database/schemas/main/tables/debt/debt-payments.table";
export { debtSchema } from "@database/schemas/main/tables/debt/debt.schema";
export {
	debtStatusEnum,
	debtTable,
} from "@database/schemas/main/tables/debt/debt.table";
export {
	accountCategoryExpensesStatsMaterializedView,
	accountMonthlyStatsMaterializedView,
	accountStatsMaterializedView,
} from "@database/schemas/main/tables/finances/account-stats.materialized-views";
export { accountTable } from "@database/schemas/main/tables/finances/account.table";
export { categoryTable } from "@database/schemas/main/tables/finances/category.table";
export { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
export { tagAutomatcherTable } from "@database/schemas/main/tables/finances/tag-automatcher.table";
export { tagTable } from "@database/schemas/main/tables/finances/tag.table";
export { transactionsReviewTable } from "@database/schemas/main/tables/finances/transaction-review.table";
export { transactionTagTable as transactionTag } from "@database/schemas/main/tables/finances/transaction-tag.table";
export { transactionsTable } from "@database/schemas/main/tables/finances/transaction.table";
export { identitySchema } from "@database/schemas/main/tables/identity/identity.schema";
export { permissionTable } from "@database/schemas/main/tables/identity/permission.table";
export { rolePermissionTable } from "@database/schemas/main/tables/identity/role-permission.table";
export { roleTable } from "@database/schemas/main/tables/identity/role.table";
export { userPreferencesTable } from "@database/schemas/main/tables/identity/user-preferences.table";
export { userRoleTable } from "@database/schemas/main/tables/identity/user-role.table";
export { userTable } from "@database/schemas/main/tables/identity/user.table";
export { contactTable } from "@database/schemas/main/tables/social/contact.table";
export { socialSchema } from "@database/schemas/main/tables/social/social.schema";
export { userSocialConfigTable } from "@database/schemas/main/tables/social/user-social-config.table";
