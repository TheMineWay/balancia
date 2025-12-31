import type { BudgetModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type BudgetUpdatedEventPayload = {
	budget: BudgetModel;
};

/**
 * Event emitted when a budget is updated
 */
export class BudgetUpdatedEvent extends Event<BudgetUpdatedEventPayload> {
	public static readonly NAME = "budget.updated";

	constructor(payload: BudgetUpdatedEventPayload) {
		super(BudgetUpdatedEvent.NAME, payload);
	}
}

type BudgetCreatedEventPayload = {
	budget: BudgetModel;
};

/**
 * Event emitted when a budget is created
 */
export class BudgetCreatedEvent extends Event<BudgetCreatedEventPayload> {
	public static readonly NAME = "budget.created";

	constructor(payload: BudgetCreatedEventPayload) {
		super(BudgetCreatedEvent.NAME, payload);
	}
}

type BudgetDeletedEventPayload = { budgetId: BudgetModel["id"] };

/**
 * Event emitted when a budget is deleted
 */
export class BudgetDeletedEvent extends Event<BudgetDeletedEventPayload> {
	public static readonly NAME = "budget.deleted";

	constructor(payload: BudgetDeletedEventPayload) {
		super(BudgetDeletedEvent.NAME, payload);
	}
}
