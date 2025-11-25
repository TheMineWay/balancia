import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { DebtModel, DebtOriginCreateModel, UserModelId } from "@shared/models";
import { DebtsService } from "src/features/debts/debts.service";
import { DebtOriginRepository } from "src/features/debts/repositories/debt-origin.repository";

@Injectable()
export class DebtOriginService {
	constructor(
        private readonly debtOriginRepository: DebtOriginRepository,
        private readonly debtsService: DebtsService,
        @Inject(DATABASE_PROVIDERS.main)
        private readonly databaseService: DatabaseService
    ) {}

    	async userSetToDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
		transactions: DebtOriginCreateModel[],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.debtsService.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			await this.debtOriginRepository.removeByDebt(debtId, {
				transaction,
			});
			await this.debtOriginRepository.bulkCreate(
				transactions.map((t) => ({
					transactionId: t.transactionId,
					amount: t.amount,
					debtId,
					notes: t.notes,
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
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.debtsService.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.debtOriginRepository.findWithTransactionByDebtId(
				debtId,
				{
					transaction,
				},
			);
		});
	}
}
