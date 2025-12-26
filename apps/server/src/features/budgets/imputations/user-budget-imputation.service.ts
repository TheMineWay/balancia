import { DATABASE_PROVIDERS } from "@database/database.provider";
import { DatabaseService } from "@database/services/database.service";
import {
	Inject,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";
import type {
	BudgetSegmentImputationCreateModel,
	BudgetSegmentImputationModel,
	UserModelId,
} from "@shared/models";
import { BudgetImputationService } from "src/features/budgets/imputations/budget-imputation.service";
import { UserBudgetSegmentsService } from "src/features/budgets/segments/user-budget-segments.service";

@Injectable()
export class UserBudgetImputationService {
	constructor(
		private readonly budgetImputationService: BudgetImputationService,
		private readonly userBudgetSegmentsService: UserBudgetSegmentsService,
		@Inject(DATABASE_PROVIDERS.main)
		private readonly databaseService: DatabaseService,
	) {}

	// #region CRUD

	async getById(
		userId: UserModelId,
		imputationId: BudgetSegmentImputationModel["id"],
	): Promise<BudgetSegmentImputationModel> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const imputation = await this.budgetImputationService.getById(
				imputationId,
				{ transaction },
			);

			/**
			 * Check if the imputation exists
			 * To avoid leaking information, we throw Unauthorized if not found
			 */
			if (!imputation) throw new UnauthorizedException();

			const { isOwner } = await this.userBudgetSegmentsService.checkOwnership(
				userId,
				imputation.segmentId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			return imputation;
		});
	}

	async create(
		userId: UserModelId,
		imputation: BudgetSegmentImputationCreateModel,
	): Promise<BudgetSegmentImputationModel> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const { isOwner } = await this.userBudgetSegmentsService.checkOwnership(
				userId,
				imputation.segmentId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			const created = await this.budgetImputationService.create(imputation, {
				transaction,
			});
			if (!created)
				throw new InternalServerErrorException("Failed to create imputation");

			return created;
		});
	}

	async updateById(
		userId: UserModelId,
		imputationId: BudgetSegmentImputationModel["id"],
		imputation: Partial<BudgetSegmentImputationCreateModel>,
	): Promise<BudgetSegmentImputationModel> {
		return await this.databaseService.db.transaction(async (transaction) => {
			const existingImputation = await this.budgetImputationService.getById(
				imputationId,
				{ transaction },
			);

			/**
			 * Check if the imputation exists
			 * To avoid leaking information, we throw Unauthorized if not found
			 */
			if (!existingImputation) throw new UnauthorizedException();

			const { isOwner } = await this.userBudgetSegmentsService.checkOwnership(
				userId,
				existingImputation.segmentId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			const updated = await this.budgetImputationService.updateById(
				imputationId,
				imputation,
				{ transaction },
			);
			if (!updated) throw new InternalServerErrorException();

			return updated;
		});
	}

	async deleteById(
		userId: UserModelId,
		imputationId: BudgetSegmentImputationModel["id"],
	): Promise<void> {
		await this.databaseService.db.transaction(async (transaction) => {
			const existingImputation = await this.budgetImputationService.getById(
				imputationId,
				{ transaction },
			);

			/**
			 * Check if the imputation exists
			 * To avoid leaking information, we throw Unauthorized if not found
			 */
			if (!existingImputation) throw new UnauthorizedException();

			const { isOwner } = await this.userBudgetSegmentsService.checkOwnership(
				userId,
				existingImputation.segmentId,
				{ transaction },
			);
			if (!isOwner) throw new UnauthorizedException();

			await this.budgetImputationService.deleteById(imputationId, {
				transaction,
			});
		});
	}

	// #endregion
}
