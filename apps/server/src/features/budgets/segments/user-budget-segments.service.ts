import { DATABASE_PROVIDERS } from "@database/database.provider";
import type { QueryOptions } from "@database/repository/repository";
import type { BudgetSegmentSelect } from "@database/schemas/main/tables/budget/budget-segment.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import type {
	BudgetModel,
	BudgetSegmentCreateModel,
	BudgetSegmentImputationCreateModel,
	BudgetSegmentImputationModel,
	BudgetSegmentImputationWithTransactionModel,
	BudgetSegmentModel,
	PaginatedResponse,
	PaginatedSearchModel,
	TransactionFiltersModel,
	UserModelId,
} from "@shared/models";
import { UserBudgetsService } from "src/features/budgets/budgets/user-budgets.service";
import { BudgetSegmentsService } from "src/features/budgets/segments/budget-segments.service";
import { BudgetSegmentImputationsRepository } from "src/features/budgets/segments/repositories/budget-segment-imputations.repository";
import { BudgetSegmentsRepository } from "src/features/budgets/segments/repositories/budget-segments.repository";
import { TransactionsService } from "src/features/finances/transactions/transactions.service";

@Injectable()
export class UserBudgetSegmentsService {
	constructor(
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
		private readonly budgetSegmentsRepository: BudgetSegmentsRepository,
		private readonly budgetSegmentImputationsRepository: BudgetSegmentImputationsRepository,
		private readonly budgetSegmentsService: BudgetSegmentsService,
		private readonly userBudgetsService: UserBudgetsService,
		private readonly transactionsService: TransactionsService,
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

	// #region Imputations

	async listImputationsBySegmentId(
		userId: UserModelId,
		segmentId: BudgetSegmentModel["id"],
		search: PaginatedSearchModel,
		filters?: TransactionFiltersModel,
	): Promise<PaginatedResponse<BudgetSegmentImputationWithTransactionModel>> {
		return await this.databaseService.db.transaction(async (tx) => {
			const { isOwner } = await this.checkOwnership(userId, segmentId, {
				transaction: tx,
			});
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.listImputationsBySegmentId(
				segmentId,
				search,
				filters,
				{
					transaction: tx,
				},
			);
		});
	}

	async impute(
		userId: UserModelId,
		impute: BudgetSegmentImputationCreateModel,
	): Promise<BudgetSegmentImputationModel | null> {
		return await this.databaseService.db.transaction(async (tx) => {
			const { isOwner } = await this.checkOwnership(userId, impute.segmentId, {
				transaction: tx,
			});
			if (!isOwner) throw new UnauthorizedException();

			// Check ownership of the imputation info being set
			const isInfoOwner = await this.checkImputationInfoOwnership(
				userId,
				impute,
				{
					transaction: tx,
				},
			);
			if (!isInfoOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.impute(impute, {
				transaction: tx,
			});
		});
	}

	async updateImputation(
		userId: UserModelId,
		imputationId: BudgetSegmentImputationModel["id"],
		impute: Partial<BudgetSegmentImputationCreateModel>,
	): Promise<BudgetSegmentImputationModel | null> {
		return await this.databaseService.db.transaction(async (tx) => {
			const existingImputation =
				await this.budgetSegmentImputationsRepository.findById(imputationId, {
					transaction: tx,
				});
			if (!existingImputation) throw new UnauthorizedException();

			// #region Ownership Checks

			// Check ownership of the segment associated with the imputation
			const { isOwner } = await this.checkOwnership(
				userId,
				existingImputation.segmentId,
				{
					transaction: tx,
				},
			);
			if (!isOwner) throw new UnauthorizedException();

			// Check ownership of the new info being set (if any)
			const isInfoOwner = await this.checkImputationInfoOwnership(
				userId,
				impute,
				{
					transaction: tx,
				},
			);
			if (!isInfoOwner) throw new UnauthorizedException();

			// #endregion

			return await this.budgetSegmentsService.updateImputation(
				imputationId,
				impute,
				{
					transaction: tx,
				},
			);
		});
	}

	async removeImputation(
		userId: UserModelId,
		imputationId: BudgetSegmentImputationModel["id"],
	): Promise<void> {
		await this.databaseService.db.transaction(async (tx) => {
			const existingImputation =
				await this.budgetSegmentImputationsRepository.findById(imputationId, {
					transaction: tx,
				});
			if (!existingImputation) throw new UnauthorizedException();

			// Check ownership of the segment associated with the imputation
			const { isOwner } = await this.checkOwnership(
				userId,
				existingImputation.segmentId,
				{
					transaction: tx,
				},
			);
			if (!isOwner) throw new UnauthorizedException();

			return await this.budgetSegmentsService.removeImputation(imputationId, {
				transaction: tx,
			});
		});
	}

	// #endregion

	async checkImputationInfoOwnership(
		userId: UserModelId,
		impute: Partial<BudgetSegmentImputationCreateModel>,
		options?: QueryOptions,
	): Promise<boolean> {
		return await (options?.transaction ?? this.databaseService.db).transaction(
			async (transaction) => {
				// If segmentId is being updated, check ownership of the new segment as well
				if (impute.segmentId) {
					const { isOwner: isNewSegmentOwner } = await this.checkOwnership(
						userId,
						impute.segmentId,
						{
							transaction,
						},
					);
					if (!isNewSegmentOwner) return false;
				}

				// [Transaction checks]
				// If transactionId is being updated, check ownership of the new transaction as well
				if (impute.transactionId) {
					const { isOwner: isTransactionOwner } =
						await this.transactionsService.checkTransactionOwnership(
							userId,
							impute.transactionId,
							{ transaction },
						);
					if (!isTransactionOwner) return false;
				}
				return true;
			},
		);
	}
}

/* Internal */

type CheckSegmentOwnershipResponse =
	| { isOwner: true; segment: BudgetSegmentSelect }
	| { isOwner: false; segment: null };
