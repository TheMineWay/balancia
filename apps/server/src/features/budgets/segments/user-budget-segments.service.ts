import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import type { BudgetSegmentSelect } from "@database/schemas/main/tables/budget/budget-segment.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	BudgetModel,
	BudgetSegmentCreateModel,
	BudgetSegmentModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionFiltersModel,
	TransactionPopulatedModel,
	UserModelId,
} from "@shared/models";
import { UserBudgetsService } from "src/features/budgets/budgets/user-budgets.service";
import { BudgetSegmentsService } from "src/features/budgets/segments/budget-segments.service";
import { BudgetSegmentsRepository } from "src/features/budgets/segments/repositories/budget-segments.repository";

@Injectable()
export class UserBudgetSegmentsService {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly budgetSegmentsRepository: BudgetSegmentsRepository,
		private readonly budgetSegmentsService: BudgetSegmentsService,
		private readonly userBudgetsService: UserBudgetsService,
	) {}

	async checkOwnership(
		userId: UserModelId,
		segmentId: BudgetSegmentModel["id"],
		options?: QueryOptions,
	): Promise<CheckSegmentOwnershipResponse> {
		const segment = await this.budgetSegmentsRepository.findByIdAndUserId(
			segmentId,
			userId,
			options,
		);

		if (segment) return { isOwner: true, segment };
		return { isOwner: false, segment: null };
	}

	async getByBudgetId(
		userId: UserModelId,
		budgetId: BudgetModel["id"],
	): Promise<BudgetSegmentModel[]> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.userBudgetsService.checkOwnership(
				userId,
				budgetId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsRepository.findByBudgetId(budgetId, {
				transaction,
			});
		});
	}

	// #region CRUD

	async getById(
		userId: UserModelId,
		segmentId: BudgetSegmentModel["id"],
	): Promise<BudgetSegmentModel | null> {
		const { isOwner, segment } = await this.checkOwnership(userId, segmentId);
		if (!isOwner || !segment) return null;

		return segment;
	}

	async create(
		userId: UserModelId,
		data: BudgetSegmentCreateModel,
	): Promise<BudgetSegmentModel | null> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.userBudgetsService.checkOwnership(
				userId,
				data.budgetId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.create(data, { transaction });
		});
	}

	async updateById(
		userId: UserModelId,
		segmentId: BudgetSegmentModel["id"],
		data: Partial<BudgetSegmentCreateModel>,
	): Promise<BudgetSegmentModel | null> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, segmentId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.updateById(segmentId, data, {
				transaction,
			});
		});
	}

	async deleteById(
		userId: UserModelId,
		segmentId: BudgetSegmentModel["id"],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.checkOwnership(userId, segmentId, {
				transaction,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.deleteById(segmentId, {
				transaction,
			});
		});
	}

	// #endregion

	// #region Transactions

	async listPopulatedTransactionsBySegmentId(
		userId: UserModelId,
		segmentId: BudgetSegmentModel["id"],
		search: PaginatedSearchModel,
		filters?: TransactionFiltersModel,
	): Promise<PaginatedResponse<TransactionPopulatedModel>> {
		return await this.databaseService.db.transaction(async (tx) => {
			const { isOwner } = await this.checkOwnership(userId, segmentId, {
				transaction: tx,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.listPopulatedTransactionsBySegmentId(
				segmentId,
				search,
				filters,
				{
					transaction: tx,
				},
			);
		});
	}

	// #endregion
}

/* Internal */

type CheckSegmentOwnershipResponse =
	| { isOwner: true; segment: BudgetSegmentSelect }
	| { isOwner: false; segment: null };
