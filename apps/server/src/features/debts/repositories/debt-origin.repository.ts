import { type QueryOptions, Repository } from "@database/repository/repository";
import { transactionsTable } from "@database/schemas/main.schema";
import {
	DEBT_ORIGIN_TABLE_COLUMNS,
	DebtOriginInsert,
	DebtOriginSelect,
	debtOriginTable,
} from "@database/schemas/main/tables/debt/debt-origin.table";
import { TRANSACTIONS_TABLE_COLUMNS } from "@database/schemas/main/tables/finances/transaction.table";
import { Injectable } from "@nestjs/common";
import type { DebtModel } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class DebtOriginRepository extends Repository {
	async findByDebtId(
		debtId: DebtModel["id"],
		options?: QueryOptions,
	): Promise<DebtOriginSelect[]> {
		return await this.query(options)
			.select()
			.from(debtOriginTable)
			.where(eq(debtOriginTable.debtId, debtId));
	}

	async findWithTransactionByDebtId(
		debtId: DebtModel["id"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.select({
				...DEBT_ORIGIN_TABLE_COLUMNS,
				transaction: TRANSACTIONS_TABLE_COLUMNS,
			})
			.from(debtOriginTable)
			.leftJoin(
				transactionsTable,
				eq(debtOriginTable.transactionId, transactionsTable.id),
			)
			.where(eq(debtOriginTable.debtId, debtId));
	}

	async removeByDebt(
		debtId: DebtModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(debtOriginTable)
			.where(eq(debtOriginTable.debtId, debtId));
	}

	async bulkCreate(
		items: DebtOriginInsert[],
		options?: QueryOptions,
	): Promise<void> {
		if (items.length === 0) return;
		await this.query(options).insert(debtOriginTable).values(items);
	}
}
