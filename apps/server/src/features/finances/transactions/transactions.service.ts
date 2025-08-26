import { Injectable } from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedQuery,
	PaginatedResponse,
	TransactionCreateModel,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import { TransactionsRepository } from "src/features/finances/transactions/repositories/transactions.repository";
import {
	TransactionCreatedEvent,
	TransactionDeletedEvent,
	TransactionUpdatedEvent,
} from "src/features/finances/transactions/transactions.events";

@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepository: TransactionsRepository,
		private readonly eventService: EventService,
	) {}

	async getPaginatedTransactionsByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
	): Promise<PaginatedResponse<OwnedModel<TransactionModel>>> {
		return await this.transactionsRepository.paginatedFindTransactionsByUserId(
			userId,
			pagination,
		);
	}

	async createTransaction(
		userId: UserModel["id"],
		transaction: TransactionCreateModel,
	) {
		// TODO: if category is provided. Check if it is owned by the user
		const created = await this.transactionsRepository.create({
			...transaction,
			userId,
		});

		this.eventService.emit(
			new TransactionCreatedEvent({ transaction: created }),
		);

		return created;
	}

	async updateTransaction(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		transaction: Partial<TransactionCreateModel>,
	) {
		// TODO: if category is provided. Check if it is owned by the user
		const updated = await this.transactionsRepository.updateByIdAndUserId(
			userId,
			transactionId,
			transaction,
		);

		if (updated)
			this.eventService.emit(
				new TransactionUpdatedEvent({ transaction: updated }),
			);

		return updated;
	}

	async deleteTransaction(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
	) {
		const deleted = await this.transactionsRepository.deleteByUserIdAndId(
			userId,
			transactionId,
		);

		if (deleted)
			this.eventService.emit(
				new TransactionDeletedEvent({ transaction: deleted }),
			);

		return deleted;
	}
}
