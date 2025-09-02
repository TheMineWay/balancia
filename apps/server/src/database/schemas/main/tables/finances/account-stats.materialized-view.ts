import { accountTable } from "@database/schemas/main/tables/finances/account.table";
import { financesSchema } from "@database/schemas/main/tables/finances/finances.schema";
import { transactionsTable } from "@database/schemas/main/tables/finances/transaction.table";
import { eq, sum } from "drizzle-orm";

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
