import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DebtSelect } from "@database/schemas/main/tables/debt/debt.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	DebtCreateModel,
	DebtListModel,
	DebtModel,
	DebtOriginCreateModel,
	DebtPaymentCreateModel,
	DebtPaymentModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionModel,
	UserModelId
} from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	DebtCreatedEvent,
	DebtDeletedEvent,
	DebtUpdatedEvent,
} from "src/features/debts/debts.events";
import { DebtOriginRepository } from "src/features/debts/repositories/debt-origin.repository";
import { DebtPaymentsRepository } from "src/features/debts/repositories/debt-payments.repository";
import { DebtsRepository } from "src/features/debts/repositories/debts.repository";

@Injectable()
export class DebtsService {
	constructor(
		private readonly debtsRepository: DebtsRepository,
		private readonly debtOriginRepository: DebtOriginRepository,
		private readonly debtPaymentsRepository: DebtPaymentsRepository,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly eventService: EventService,
	) {}

	async checkOwnership(
		debtId: DebtModel["id"],
		userId: UserModelId,
		options?: QueryOptions,
	): Promise<CheckDebtOwnershipResponse> {
		const debt = await this.debtsRepository.findById(debtId, options);
		if (debt?.userId === userId) return { isOwner: true, debt };
		return { isOwner: false, debt: null };
	}

	async create(
		debt: DebtCreateModel,
		options?: QueryOptions,
	): Promise<DebtSelect> {
		const created = await this.debtsRepository.create(debt, options);

		// Trigger created event
		this.eventService.emit(new DebtCreatedEvent({ debt: created }));

		return created;
	}

	async delete(debtId: DebtModel["id"], options?: QueryOptions): Promise<void> {
		await this.debtsRepository.deleteById(debtId, options);

		// Trigger deleted event
		this.eventService.emit(new DebtDeletedEvent({ debtId }));
	}

	async update(
		debtId: DebtModel["id"],
		debt: Partial<DebtCreateModel>,
		options?: QueryOptions,
	): Promise<void> {
		const [updated] = await this.debtsRepository.updateById(
			debtId,
			debt,
			options,
		);

		// Trigger updated event
		if (updated)
			this.eventService.emit(new DebtUpdatedEvent({ debt: updated }));
	}

	//#region User methods

	async findUserDebtsList(
		userId: UserModelId,
		{ pagination, search }: PaginatedSearchModel,
	): Promise<PaginatedResponse<DebtListModel>> {
		return await this.debtsRepository.findListByUserId(userId, {
			pagination,
			search,
		});
	}

	async userDebtUpdate(
		userId: UserModelId,
		debtId: DebtModel["id"],
		debt: Partial<DebtCreateModel>,
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			await this.update(debtId, debt, { transaction });
		});
	}

	async userDebtDelete(
		userId: UserModelId,
		debtId: DebtModel["id"],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(debtId, userId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			await this.delete(debtId, { transaction });
		});
	}

	async userSetOriginTransactionsToDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
		transactions: DebtOriginCreateModel[],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(debtId, userId, {
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

	async userGetOriginTransactionsOfDebt(
		userId: UserModelId,
		debtId: DebtModel["id"],
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(debtId, userId, {
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

	async userSetPaymentTransactionsToDebt(userId: UserModelId, debtId: DebtModel['id'], transactions: Omit<DebtPaymentCreateModel, 'debtId'>[]): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(debtId, userId, {
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

	async userGetPaymentTransactionsOfDebt(userId: UserModelId, debtId: DebtModel['id']): Promise<(DebtPaymentModel & { transaction: TransactionModel | null })[]> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(debtId, userId, {
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

/* Internal */

type CheckDebtOwnershipResponse =
	| { isOwner: true; debt: DebtSelect }
	| { isOwner: false; debt: null };
