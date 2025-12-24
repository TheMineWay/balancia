import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import type { BudgetSelect } from "@database/schemas/main/tables/budget/budget.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	BudgetCreateModel,
	BudgetFiltersModel,
	BudgetModel,
	PaginatedResponse,
	PaginatedSearchModel,
	UserModelId,
} from "@shared/models";
import { BudgetsService } from "src/features/budgets/budgets/budgets.service";
import { BudgetsRepository } from "src/features/budgets/budgets/repositories/budgets.repository";

@Injectable()
export class UserBudgetsService {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly budgetsRepository: BudgetsRepository,
		private readonly budgetsService: BudgetsService,
	) {}

	async checkOwnership(
		userId: UserModelId,
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<CheckBudgetOwnershipResponse> {
		const budget = await this.budgetsRepository.findById(budgetId, options);
		if (budget?.userId === userId) return { isOwner: true, budget };
		return { isOwner: false, budget: null };
	}

	async getList(
		userId: UserModelId,
		search: PaginatedSearchModel,
		filters?: BudgetFiltersModel,
	): Promise<PaginatedResponse<BudgetModel>> {
		return await this.budgetsRepository.findUserList(userId, search, filters);
	}

	async getById(
		userId: UserModelId,
		budgetId: BudgetModel["id"],
	): Promise<BudgetModel | null> {
		const { isOwner, budget } = await this.checkOwnership(userId, budgetId);
		if (!isOwner || !budget) return null;
		return budget;
	}

	async create(
		userId: UserModelId,
		data: Omit<BudgetCreateModel, "userId">,
	): Promise<BudgetModel | null> {
		return await this.budgetsService.create({
			...data,
			userId,
		});
	}

	async update(
		userId: UserModelId,
		budgetId: BudgetModel["id"],
		data: Partial<BudgetCreateModel>,
	): Promise<BudgetModel | null> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, budgetId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetsService.updateById(budgetId, data, {
				transaction,
			});
		});
	}

	async delete(userId: UserModelId, budgetId: BudgetModel["id"]) {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, budgetId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetsService.deleteById(budgetId, { transaction });
		});
	}
}

/* Internal */

type CheckBudgetOwnershipResponse =
	| { isOwner: true; budget: BudgetSelect }
	| { isOwner: false; budget: null };
