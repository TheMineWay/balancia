import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { DebtModel, DebtPaymentCreateModel, DebtPaymentModel, TransactionModel, UserModelId } from "@shared/models";
import { DebtsService } from "src/features/debts/debts.service";
import { DebtPaymentsRepository } from "src/features/debts/repositories/debt-payments.repository";

@Injectable()
export class DebtPaymentsService {
	constructor(
		private readonly debtPaymentsRepository: DebtPaymentsRepository,
        private readonly debtsService: DebtsService,
        @Inject(DATABASE_PROVIDERS.main)
        private readonly databaseService: DatabaseService,
	) {}

	//#region User
	async userSetToDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
		transactions: Omit<DebtPaymentCreateModel, "debtId">[],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.debtsService.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			await this.debtPaymentsRepository.removeByDebtId(debtId, {
				transaction,
			});

			await this.debtPaymentsRepository.bulkCreate(
				transactions.map((t) => ({
					...t,
					debtId,
				})),
				{
					transaction,
				},
			);
		});
	}

	async userGetByDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
	): Promise<(DebtPaymentModel & { transaction: TransactionModel | null })[]> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.debtsService.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.debtPaymentsRepository.findByDebtIdWithTransaction(
				debtId,
				{
					transaction,
				},
			);
		});
	}
	//#endregion
}
