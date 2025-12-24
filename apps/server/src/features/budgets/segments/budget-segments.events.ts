import type { BudgetSegmentModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type BudgetSegmentUpdatedEventPayload = {
	budgetSegment: BudgetSegmentModel;
};

/**
 * Event emitted when a budget segment is updated
 */
export class BudgetSegmentUpdatedEvent extends Event<BudgetSegmentUpdatedEventPayload> {
	public static readonly NAME = "budgetSegment.updated";

	constructor(payload: BudgetSegmentUpdatedEventPayload) {
		super(BudgetSegmentUpdatedEvent.NAME, payload);
	}
}

type BudgetSegmentCreatedEventPayload = {
	budgetSegment: BudgetSegmentModel;
};

/**
 * Event emitted when a budget segment is created
 */
export class BudgetSegmentCreatedEvent extends Event<BudgetSegmentCreatedEventPayload> {
	public static readonly NAME = "budgetSegment.created";

	constructor(payload: BudgetSegmentCreatedEventPayload) {
		super(BudgetSegmentCreatedEvent.NAME, payload);
	}
}

type BudgetSegmentDeletedEventPayload = {
	segmentId: BudgetSegmentModel["id"];
};

/**
 * Event emitted when a budget segment is deleted
 */
export class BudgetSegmentDeletedEvent extends Event<BudgetSegmentDeletedEventPayload> {
	public static readonly NAME = "budgetSegment.deleted";

	constructor(payload: BudgetSegmentDeletedEventPayload) {
		super(BudgetSegmentDeletedEvent.NAME, payload);
	}
}
