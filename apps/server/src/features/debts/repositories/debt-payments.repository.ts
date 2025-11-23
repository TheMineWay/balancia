import { QueryOptions, Repository } from "@database/repository/repository";
import { transactionsTable } from "@database/schemas/main.schema";
import {
	DEBT_PAYMENTS_TABLE_COLUMNS,
	DebtPaymentInsert,
	DebtPaymentSelect,
	debtPaymentTable,
} from "@database/schemas/main/tables/debt/debt-payments.table";
import { TRANSACTIONS_TABLE_COLUMNS } from "@database/schemas/main/tables/finances/transaction.table";
import { Injectable } from "@nestjs/common";
import { DebtPaymentModel } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class DebtPaymentsRepository extends Repository {
	async findById(
		debtPaymentId: DebtPaymentModel["id"],
		options?: QueryOptions,
	): Promise<DebtPaymentSelect | null> {
		return (
			(await this.query(options)
				.select()
				.from(debtPaymentTable)
				.where(eq(debtPaymentTable.id, debtPaymentId))?.[0]) ?? null
		);
	}

	async findByIdWithTransaction(
		debtPaymentId: DebtPaymentModel["id"],
		options?: QueryOptions,
	) {
		return (
			(await this.query(options)
				.select()
				.from(debtPaymentTable)
				.leftJoin(
					transactionsTable,
					eq(debtPaymentTable.transactionId, transactionsTable.id),
				)
				.where(eq(debtPaymentTable.id, debtPaymentId))?.[0]) ?? null
		);
	}

	async findByDebtIdWithTransaction(
		debtId: DebtPaymentModel["debtId"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.select({
				...DEBT_PAYMENTS_TABLE_COLUMNS,
				transaction: TRANSACTIONS_TABLE_COLUMNS,
			})
			.from(debtPaymentTable)
			.leftJoin(
				transactionsTable,
				eq(debtPaymentTable.transactionId, transactionsTable.id),
			)
			.where(eq(debtPaymentTable.debtId, debtId));
	}

	async bulkCreate(
		debtPayments: DebtPaymentInsert[],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options).insert(debtPaymentTable).values(debtPayments);
	}

	async removeByDebtId(
		debtId: DebtPaymentModel["debtId"],
		options?: QueryOptions,
	): Promise<void> {
		await this.query(options)
			.delete(debtPaymentTable)
			.where(eq(debtPaymentTable.debtId, debtId));
	}
}
