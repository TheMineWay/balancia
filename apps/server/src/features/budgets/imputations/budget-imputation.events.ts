import type { BudgetSegmentImputationModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type BudgetImputationUpdatedEventPayload = {
	budgetImputation: BudgetSegmentImputationModel;
};

/**
 * Event emitted when a budget imputation is updated
 */
export class BudgetImputationUpdatedEvent extends Event<BudgetImputationUpdatedEventPayload> {
	public static readonly NAME = "budgetImputation.updated";

	constructor(payload: BudgetImputationUpdatedEventPayload) {
		super(BudgetImputationUpdatedEvent.NAME, payload);
	}
}

type BudgetImputationCreatedEventPayload = {
	budgetImputation: BudgetSegmentImputationModel;
};

/**
 * Event emitted when a budget imputation is created
 */
export class BudgetImputationCreatedEvent extends Event<BudgetImputationCreatedEventPayload> {
	public static readonly NAME = "budgetImputation.created";

	constructor(payload: BudgetImputationCreatedEventPayload) {
		super(BudgetImputationCreatedEvent.NAME, payload);
	}
}

type BudgetImputationDeletedEventPayload = {
	imputationId: BudgetSegmentImputationModel["id"];
};

/**
 * Event emitted when a budget imputation is deleted
 */
export class BudgetImputationDeletedEvent extends Event<BudgetImputationDeletedEventPayload> {
	public static readonly NAME = "budgetImputation.deleted";

	constructor(payload: BudgetImputationDeletedEventPayload) {
		super(BudgetImputationDeletedEvent.NAME, payload);
	}
}
