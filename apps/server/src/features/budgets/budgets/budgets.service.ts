import type { QueryOptions } from "@database/repository/repository";
import { Injectable } from "@nestjs/common";
import type { BudgetCreateModel, BudgetModel } from "@shared/models";
import { EventService } from "src/events/event.service";
import {
	BudgetCreatedEvent,
	BudgetDeletedEvent,
	BudgetUpdatedEvent,
} from "src/features/budgets/budgets/budgets.events";
import { BudgetsRepository } from "src/features/budgets/budgets/repositories/budgets.repository";

@Injectable()
export class BudgetsService {
	constructor(
		private readonly budgetsRepository: BudgetsRepository,
		private readonly eventService: EventService,
	) {}

	async create(
		data: BudgetCreateModel,
		options?: QueryOptions,
	): Promise<BudgetModel | null> {
		const created = await this.budgetsRepository.create(data, options);

		if (created)
			this.eventService.emit(new BudgetCreatedEvent({ budget: created }));

		return created;
	}

	async updateById(
		budgetId: BudgetModel["id"],
		data: Partial<BudgetCreateModel>,
		options?: QueryOptions,
	): Promise<BudgetModel | null> {
		const updated = await this.budgetsRepository.updateById(
			budgetId,
			data,
			options,
		);

		if (updated)
			this.eventService.emit(new BudgetUpdatedEvent({ budget: updated }));

		return updated;
	}

	async deleteById(
		budgetId: BudgetModel["id"],
		options?: QueryOptions,
	): Promise<void> {
		await this.budgetsRepository.deleteById(budgetId, options);

		this.eventService.emit(new BudgetDeletedEvent({ budgetId }));
	}
}
