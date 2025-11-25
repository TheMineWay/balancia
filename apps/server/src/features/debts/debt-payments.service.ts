import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { DebtModel, DebtPaymentCreateModel, DebtPaymentModel, TransactionModel, UserModelId } from "@shared/models";
import { EventService } from "src/events/event.service";
import { DebtPaymentCreatedEvent, DebtPaymentDeletedEvent } from "src/features/debts/debts.events";
import { DebtsService } from "src/features/debts/debts.service";
import { DebtPaymentsRepository } from "src/features/debts/repositories/debt-payments.repository";

@Injectable()
export class DebtPaymentsService {
	constructor(
		private readonly debtPaymentsRepository: DebtPaymentsRepository,
        private readonly debtsService: DebtsService,
		private readonly eventService: EventService,
        @Inject(DATABASE_PROVIDERS.main)
        private readonly databaseService: DatabaseService,
	) {}

	//#region User
	async userSetToDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
		transactions: Omit<DebtPaymentCreateModel, "debtId">[],
	): Promise<void> {
		// Store deleted and created payments for event emission
		let deletedPayments: DebtPaymentModel[] = [];
		let createdPayments: DebtPaymentModel[] = [];

		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.debtsService.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			// Fetch existing payments so we can emit delete events later
			const existingPayments = await this.debtPaymentsRepository.findByDebtId(debtId, {
				transaction,
			});

			await this.debtPaymentsRepository.removeByDebtId(debtId, {
				transaction,
			});

			createdPayments = await this.debtPaymentsRepository.bulkCreate(
				transactions.map((t) => ({
					...t,
					debtId,
				})),
				{
					transaction,
				},
			);

			deletedPayments = existingPayments;
		});

		// Emit events
		for (const payment of deletedPayments) {
			this.eventService.emit(new DebtPaymentDeletedEvent({ payment }));
		}

		for (const payment of createdPayments) {
			this.eventService.emit(new DebtPaymentCreatedEvent({ payment }));
		}
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
