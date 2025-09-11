import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import { AccountSelect } from "@database/schemas/main/tables/finances/account.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	AccountCreateModel,
	AccountModel,
	OwnedModel,
	PaginatedSearchModel,
	TransactionModel,
	UserModel,
	UserModelId,
} from "@shared/models";
import { sub } from "date-fns";
import { UserPreferencesService } from "src/common/user/preferences/user-preferences.service";
import { EventService } from "src/events/event.service";
import {
	AccountCreatedEvent,
	AccountDeletedEvent,
	AccountUpdatedEvent,
} from "src/features/finances/accounts/accounts.events";
import { AccountsRepository } from "src/features/finances/accounts/repositories/accounts.repository";

@Injectable()
export class AccountsService {
	constructor(
		private readonly accountsRepository: AccountsRepository,
		private readonly eventService: EventService,
		private readonly userPreferencesService: UserPreferencesService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	// #region Basic operations

	async create(account: OwnedModel<AccountCreateModel>) {
		const created = await this.accountsRepository.create(account);

		this.eventService.emit(new AccountCreatedEvent({ account: created }));

		return created;
	}

	async updateById(accountId: AccountModel["id"], account: AccountCreateModel) {
		const updated = await this.accountsRepository.updateById(
			accountId,
			account,
		);

		if (updated)
			this.eventService.emit(new AccountUpdatedEvent({ account: updated }));

		return updated;
	}

	async deleteById(accountId: AccountModel["id"]) {
		await this.accountsRepository.deleteById(accountId);

		this.eventService.emit(new AccountDeletedEvent({ accountId }));
	}

	// #endregion
	// #region User oriented

	async checkAccountOwnership(
		userId: UserModel["id"],
		accountId: AccountModel["id"],
		queryOptions?: QueryOptions,
	): Promise<CheckAccountOwnershipResponse> {
		const account = await this.accountsRepository.findByUserIdAndId(
			userId,
			accountId,
			queryOptions,
		);

		return {
			account,
			isOwner: account?.userId === userId,
		} as CheckAccountOwnershipResponse;
	}

	async getUserMainAccount(userId: UserModelId): Promise<AccountModel | null> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const userPreferences = await this.userPreferencesService.getByUserId(
				userId,
				{ transaction },
			);

			if (!userPreferences?.mainAccount) return null;

			return await this.accountsRepository.findByUserIdAndId(
				userId,
				userPreferences.mainAccount,
				{ transaction },
			);
		});
	}

	// CRUD

	async getPaginatedAccountsByUserId(
		userId: UserModel["id"],
		paginatedSearch: PaginatedSearchModel,
	) {
		return await this.accountsRepository.paginatedFindByUserId(
			userId,
			paginatedSearch,
		);
	}

	async getUserAccountById(userId: UserModelId, accountId: AccountModel["id"]) {
		return await this.accountsRepository.findByUserIdAndId(userId, accountId);
	}

	async updateUserAccountById(
		userId: UserModelId,
		accountId: AccountModel["id"],
		account: AccountCreateModel,
	) {
		const { isOwner } = await this.checkAccountOwnership(userId, accountId);

		if (!isOwner) throw new UnauthorizedException();
		return await this.accountsRepository.updateById(accountId, account);
	}

	async deleteUserAccountById(
		userId: UserModelId,
		accountId: AccountModel["id"],
	) {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner, account } = await this.checkAccountOwnership(
				userId,
				accountId,
				{
					transaction,
				},
			);

			if (!isOwner) throw new UnauthorizedException();
			await this.accountsRepository.deleteById(account.id, { transaction });
		});
	}

	async createUserAccount(userId: UserModelId, account: AccountCreateModel) {
		return await this.create({
			userId,
			...account,
		});
	}

	// #endregion
	// #region Transaction oriented

	async getAccountByTransactionId(
		transactionId: TransactionModel["id"],
		queryOptions?: QueryOptions,
	) {
		return await this.accountsRepository.findAccountByTransactionId(
			transactionId,
			queryOptions,
		);
	}

	// #endregion

	// #region Stats

	async getUserAccountMonthlyStats(
		userId: UserModelId,
		accountId: AccountModel["id"],
		options: { periodEnd: Date; months: number },
	) {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner, account } = await this.checkAccountOwnership(
				userId,
				accountId,
				{
					transaction,
				},
			);

			if (!isOwner) throw new UnauthorizedException();

			return await this.accountsRepository.findAccountMonthlyStats(
				account.id,
				{
					endDate: options.periodEnd,
					startDate: sub(options.periodEnd, { months: options.months - 1 }),
				},
				{
					transaction,
				},
			);
		});
	}

	// #endregion
}

/* Internal */

type CheckAccountOwnershipResponse =
	| { isOwner: true; account: AccountSelect }
	| { isOwner: false; account: null };
