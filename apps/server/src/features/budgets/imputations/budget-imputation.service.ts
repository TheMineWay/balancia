import type { QueryOptions } from "@database/repository/repository";
import { Injectable } from "@nestjs/common";
import type {
	BudgetSegmentImputationCreateModel,
	BudgetSegmentImputationModel,
} from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	BudgetImputationCreatedEvent,
	BudgetImputationDeletedEvent,
	BudgetImputationUpdatedEvent,
} from "src/features/budgets/imputations/budget-imputation.events";
import { BudgetSegmentImputationRepository } from "src/features/budgets/imputations/repositories/budget-segment-imputation.repository";

@Injectable()
export class BudgetImputationService {
	constructor(
		private readonly budgetSegmentImputationRepository: BudgetSegmentImputationRepository,
		private readonly eventService: EventService,
	) {}

	/**
	 * Retrieves a budget segment imputation by its ID.
	 */
	async getById(
		id: BudgetSegmentImputationModel["id"],
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationModel | null> {
		return await this.budgetSegmentImputationRepository.findById(id, options);
	}

	/**
	 * Creates a new budget segment imputation.
	 */
	async create(
		imputation: BudgetSegmentImputationCreateModel,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationModel | null> {
		const created = await this.budgetSegmentImputationRepository.create(
			imputation,
			options,
		);

		if (created) {
			this.eventService.emit(
				new BudgetImputationCreatedEvent({ budgetImputation: created }),
			);
		}

		return created;
	}

	/**
	 * Updates a budget segment imputation by its ID.
	 */
	async updateById(
		id: BudgetSegmentImputationModel["id"],
		imputation: Partial<BudgetSegmentImputationCreateModel>,
		options?: QueryOptions,
	): Promise<BudgetSegmentImputationModel | null> {
		const updated = await this.budgetSegmentImputationRepository.updateById(
			id,
			imputation,
			options,
		);

		if (updated) {
			this.eventService.emit(
				new BudgetImputationUpdatedEvent({ budgetImputation: updated }),
			);
		}

		return updated;
	}

	/**
	 * Deletes a budget segment imputation by its ID.
	 */
	async deleteById(
		id: BudgetSegmentImputationModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.budgetSegmentImputationRepository.deleteById(id, options);

		this.eventService.emit(
			new BudgetImputationDeletedEvent({ imputationId: id }),
		);
	}
}
