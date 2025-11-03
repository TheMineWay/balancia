import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DebtSelect } from "@database/schemas/main/tables/debt/debt.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable } from "@nestjs/common";
import type {
	DebtCreateModel,
	DebtListModel,
	DebtModel,
	PaginatedResponse,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { DebtsRepository } from "src/features/debts/repositories/debts.repository";
import { AccountsService } from "src/features/finances/accounts/accounts.service";

@Injectable()
export class DebtsService {
	constructor(
		private readonly debtsRepository: DebtsRepository,
		private readonly accountsService: AccountsService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
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

	async create(userId: UserModelId, debt: DebtCreateModel) {}

	async delete(userId: UserModelId, debtId: DebtModel["id"]) {}

	async findList(
		userId: UserModelId,
		{ pagination, search }: PaginatedSearchModel,
	): Promise<PaginatedResponse<DebtListModel>> {
		return await this.debtsRepository.findListByUserId(userId, {
			pagination,
			search,
		});
	}

	async update(
		userId: UserModelId,
		debtId: DebtModel["id"],
		debt: DebtCreateModel,
	) {}
}

/* Internal */

type CheckDebtOwnershipResponse =
	| { isOwner: true; debt: DebtSelect }
	| { isOwner: false; debt: null };
