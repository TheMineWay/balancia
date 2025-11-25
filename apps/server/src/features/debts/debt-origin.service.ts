import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { DebtModel, DebtOriginCreateModel, DebtOriginModel, UserModelId } from "@shared/models";
import { EventService } from "src/events/event.service";
import { DebtOriginCreatedEvent, DebtOriginDeletedEvent } from "src/features/debts/debts.events";
import { DebtsService } from "src/features/debts/debts.service";
import { DebtOriginRepository } from "src/features/debts/repositories/debt-origin.repository";

@Injectable()
export class DebtOriginService {
	constructor(
        private readonly debtOriginRepository: DebtOriginRepository,
        private readonly debtsService: DebtsService,
		private readonly eventService: EventService,
        @Inject(DATABASE_PROVIDERS.main)
        private readonly databaseService: DatabaseService
    ) {}

    	async userSetToDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
		transactions: DebtOriginCreateModel[],
	): Promise<void> {

		let deletedOrigins: DebtOriginModel[] = [];
		let createdOrigins: DebtOriginModel[] = [];

		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.debtsService.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			const existingOrigins = await this.debtOriginRepository.findByDebtId(debtId, {
				transaction,
			});

			deletedOrigins = existingOrigins;

			await this.debtOriginRepository.removeByDebt(debtId, {
				transaction,
			});

			createdOrigins = await this.debtOriginRepository.bulkCreate(
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

		// Emit events
		for (const origin of deletedOrigins) {
			this.eventService.emit(new DebtOriginDeletedEvent({  origin }) );
		}

		for (const origin of createdOrigins) {
			this.eventService.emit(new DebtOriginCreatedEvent({ origin }) );
		}
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
