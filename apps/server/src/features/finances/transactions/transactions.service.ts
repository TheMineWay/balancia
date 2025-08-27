import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable } from "@nestjs/common";
import type {
	OwnedModel,
	PaginatedQuery,
	PaginatedResponse,
	TransactionCreateModel,
	TransactionModel,
	UserModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import { CategoriesRepository } from "src/features/finances/categories/repositories/categories.repository";
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
		private readonly categoriesRepository: CategoriesRepository,
		private readonly eventService: EventService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
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

	async create(
		userId: UserModel["id"],
		{ categoryId, ...transaction }: TransactionCreateModel,
	) {
		return await this.databaseService.db.transaction(async (tsx) => {
			// If category is provided. Check if it is owned by the user
			const category = categoryId
				? await this.categoriesRepository.findCategoryByUserId(
						userId,
						categoryId,
					)
				: null;

			const created = await this.transactionsRepository.create(
				{
					...transaction,
					categoryId: category?.id ?? null,
					userId,
				},
				{ transaction: tsx },
			);

			this.eventService.emit(
				new TransactionCreatedEvent({ transaction: created }),
			);

			return created;
		});
	}

	async updateByUserIdAndId(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		{ categoryId, ...transaction }: Partial<TransactionCreateModel>,
	) {
		// If category is provided. Check if it is owned by the user
		const category = categoryId
			? await this.categoriesRepository.findCategoryByUserId(userId, categoryId)
			: null;

		const updated = await this.transactionsRepository.updateByIdAndUserId(
			userId,
			transactionId,
			{ ...transaction, categoryId: category?.id ?? null },
		);

		if (updated)
			this.eventService.emit(
				new TransactionUpdatedEvent({ transaction: updated }),
			);

		return updated;
	}

	async deleteByUserIdAndId(
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
