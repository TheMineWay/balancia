import { DATABASE_PROVIDERS } from "@database/database.provider";
import { QueryOptions } from "@database/repository/repository";
import { DebtSelect } from "@database/schemas/main/tables/debt/debt.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	DebtCreateModel,
	DebtListModel,
	DebtModel,
	PaginatedResponse,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { DebtsRepository } from "src/features/debts/repositories/debts.repository";

@Injectable()
export class DebtsService {
	constructor(
		private readonly debtsRepository: DebtsRepository,
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

	async create(
		userId: UserModelId,
		debt: Omit<DebtCreateModel, "userId">,
	): Promise<DebtSelect> {
		return await this.debtsRepository.create({
			...debt,
			userId,
		});
	}

	async delete(debtId: DebtModel["id"]): Promise<void> {
		await this.debtsRepository.deleteById(debtId);
	}

	async update(
		debtId: DebtModel["id"],
		debt: Omit<DebtCreateModel, "userId">,
	): Promise<void> {
		await this.debtsRepository.updateById(debtId, debt);
	}

	/* User */

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

			await this.debtsRepository.updateById(debtId, debt, { transaction });
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

			await this.debtsRepository.deleteById(debtId, { transaction });
		});
	}
}

/* Internal */

type CheckDebtOwnershipResponse =
	| { isOwner: true; debt: DebtSelect }
	| { isOwner: false; debt: null };
