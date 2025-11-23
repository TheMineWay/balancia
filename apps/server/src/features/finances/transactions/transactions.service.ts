import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { TransactionsSelect } from "@database/schemas/main/tables/finances/transaction.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	PaginatedQuery,
	SearchModel,
	TransactionCreateModel,
	TransactionModel,
	UserModel,
	UserModelId,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import { AccountsService } from "src/features/finances/accounts/accounts.service";
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
		private readonly accountsService: AccountsService,
		private readonly eventService: EventService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	async checkTransactionOwnership(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		queryOptions?: QueryOptions,
	) {
		const account = await this.accountsService.getAccountByTransactionId(
			transactionId,
			queryOptions,
		);

		return {
			isOwner: account?.userId === userId,
		};
	}

	async getTransactionsListByUserId(
		userId: UserModel["id"],
		pagination: PaginatedQuery,
		search?: SearchModel,
		filters?: Partial<Pick<TransactionModel, "accountId">>,
	) {
		return await this.transactionsRepository.paginatedFindTransactionsListByUserId(
			userId,
			pagination,
			search,
			filters,
		);
	}

	async getUserDetailedTransactionById(
		userId: UserModelId,
		TransactionId: TransactionModel["id"],
	) {
		return await this.databaseService.db.transaction(async (tsx) => {
			const { isOwner } = await this.checkTransactionOwnership(
				userId,
				TransactionId,
				{ transaction: tsx },
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.transactionsRepository.findByIdWithCategoryAndAccount(
				TransactionId,
				{ transaction: tsx },
			);
		});
	}

	async create(
		userId: UserModel["id"],
		{ categoryId, accountId, ...transaction }: TransactionCreateModel,
	) {
		return await this.databaseService.db.transaction(async (tsx) => {
			const { isOwner: isAccountOwner, account } =
				await this.accountsService.checkAccountOwnership(userId, accountId, {
					transaction: tsx,
				});

			if (!isAccountOwner) throw new UnauthorizedException();

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
					accountId: account.id,
				},
				{ transaction: tsx },
			);

			this.eventService.emit(
				new TransactionCreatedEvent({ transaction: { ...created, userId } }),
			);

			return created;
		});
	}

	async updateByUserIdAndId(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
		{ categoryId, ...transaction }: Partial<TransactionCreateModel>,
	) {
		return await this.databaseService.db.transaction(async (tsx) => {
			// Ensure transaction is owned by the user
			const { isOwner } = await this.checkTransactionOwnership(
				userId,
				transactionId,
				{ transaction: tsx },
			);
			if (!isOwner) throw new UnauthorizedException();

			// If category is provided. Check if it is owned by the user
			const category = categoryId
				? await this.categoriesRepository.findCategoryByUserId(
						userId,
						categoryId,
						{ transaction: tsx },
					)
				: null;

			const updated = await this.transactionsRepository.updateById(
				transactionId,
				{ ...transaction, categoryId: category?.id ?? null },
				{ transaction: tsx },
			);

			if (updated)
				this.eventService.emit(
					new TransactionUpdatedEvent({ transaction: { ...updated, userId } }),
				);

			return updated;
		});
	}

	async deleteByUserIdAndId(
		userId: UserModel["id"],
		transactionId: TransactionModel["id"],
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			// Ensure transaction is owned by the user
			const { isOwner } = await this.checkTransactionOwnership(
				userId,
				transactionId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			const deleted = await this.transactionsRepository.deleteById(
				transactionId,
				{ transaction },
			);

			if (deleted)
				this.eventService.emit(new TransactionDeletedEvent({ transactionId }));

			return deleted;
		});
	}

	async accountBulkCreate(
		userId: UserModelId,
		accountId: number,
		transactions: Omit<TransactionCreateModel, "accountId">[],
	) {
		let created: TransactionsSelect[] = [];
		await this.databaseService.db.transaction(async (tsx) => {
			const { isOwner } = await this.accountsService.checkAccountOwnership(
				userId,
				accountId,
				{ transaction: tsx },
			);
			if (!isOwner) throw new UnauthorizedException();

			created = await this.transactionsRepository.bulkCreate(
				transactions.map((t) => ({ ...t, accountId })),
				{
					transaction: tsx,
				},
			);
		});

		for (const transaction of created) {
			this.eventService.emit(
				new TransactionCreatedEvent({
					transaction: { ...transaction, userId },
				}),
			);
		}
	}
}
