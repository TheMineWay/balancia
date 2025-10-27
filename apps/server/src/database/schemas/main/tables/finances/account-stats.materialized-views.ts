import { accountTable } from "@database/schemas/main/tables/finances/account.table";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { transactionsTable } from "@database/schemas/main/tables/finances/transaction.table";
import { eq, sql, sum } from "drizzle-orm";

// Account stats
export const accountStatsMaterializedView = financesSchema
	.materializedView("account_stats")
	.with({
		autovacuumEnabled: true,
	})
	.as((db) => {
		// Calculate account balance
		const aggregateBalance = db
			.select({
				balance: sum(transactionsTable.amount).as("balance"),
				accountId: transactionsTable.accountId,
			})
			.from(transactionsTable)
			.groupBy(transactionsTable.accountId)
			.as("agg_balance");

		return db
			.select({
				userId: accountTable.userId,
				accountId: accountTable.id,
				balance: aggregateBalance.balance,
			})
			.from(accountTable)
			.innerJoin(
				aggregateBalance,
				eq(aggregateBalance.accountId, accountTable.id),
			);
	});

// Account monthly stats
export const accountMonthlyStatsMaterializedView = financesSchema
	.materializedView("account_monthly_stats")
	.with({ autovacuumEnabled: true })
	.as((db) => {
		const dateField =
			sql<Date>`date_trunc('month', ${transactionsTable.performedAt})::date`.as(
				"date",
			);

		const query = db
			.select({
				accountId: accountTable.id,
				userId: accountTable.userId,
				date: dateField,
				monthlyBalance:
					sql<string>`${sum(transactionsTable.amount)}::numeric`.as(
						"monthlyBalance",
					),
				income:
					sql<string>`SUM(CASE WHEN ${transactionsTable.amount} > 0 THEN ${transactionsTable.amount} ELSE 0 END)::numeric`.as(
						"income",
					),
				outcome:
					sql<string>`SUM(CASE WHEN ${transactionsTable.amount} < 0 THEN abs(${transactionsTable.amount}) ELSE 0 END)::numeric`.as(
						"outcome",
					),
			})
			.from(accountTable)
			.leftJoin(
				transactionsTable,
				eq(transactionsTable.accountId, accountTable.id),
			)
			.groupBy(accountTable.id, accountTable.userId, dateField);

		return query;
	});

// Stats by account and category
export const accountCategoryExpensesStatsMaterializedView = financesSchema
	.materializedView("account_category_expenses_stats")
	.with({ autovacuumEnabled: true })
	.as((db) => {
		const dateField =
			sql<Date>`date_trunc('month', ${transactionsTable.performedAt})::date`.as(
				"date",
			);

		const query = db
			.select({
				accountId: transactionsTable.accountId,
				categoryId: transactionsTable.categoryId,
				date: dateField,
				income:
					sql<string>`SUM(CASE WHEN ${transactionsTable.amount} > 0 THEN ${transactionsTable.amount} ELSE 0 END)::numeric`.as(
						"income",
					),
				outcome:
					sql<string>`SUM(CASE WHEN ${transactionsTable.amount} < 0 THEN abs(${transactionsTable.amount}) ELSE 0 END)::numeric`.as(
						"outcome",
					),
			})
			.from(transactionsTable)
			.groupBy(
				transactionsTable.accountId,
				transactionsTable.categoryId,
				dateField,
			);

		return query;
	});
