import type {
	BudgetSegmentImputationModel,
	BudgetSegmentModel,
} from "@shared/models";
import { Event } from "src/events/event.abstract";

// #region Segments

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

// #endregion

// #region Imputations

type BudgetSegmentImputationCreatedEventPayload = {
	imputation: BudgetSegmentImputationModel;
};

/**
 * Event emitted when a budget segment imputation is created
 */
export class BudgetSegmentImputationCreatedEvent extends Event<BudgetSegmentImputationCreatedEventPayload> {
	public static readonly NAME = "budgetSegmentImputation.created";

	constructor(payload: BudgetSegmentImputationCreatedEventPayload) {
		super(BudgetSegmentImputationCreatedEvent.NAME, payload);
	}
}

type BudgetSegmentImputationUpdatedEventPayload = {
	imputation: BudgetSegmentImputationModel;
};

/**
 * Event emitted when a budget segment imputation is updated
 */
export class BudgetSegmentImputationUpdatedEvent extends Event<BudgetSegmentImputationUpdatedEventPayload> {
	public static readonly NAME = "budgetSegmentImputation.updated";

	constructor(payload: BudgetSegmentImputationUpdatedEventPayload) {
		super(BudgetSegmentImputationUpdatedEvent.NAME, payload);
	}
}

type BudgetSegmentImputationDeletedEventPayload = {
	imputationId: BudgetSegmentImputationModel["id"];
};

/**
 * Event emitted when a budget segment imputation is deleted
 */
export class BudgetSegmentImputationDeletedEvent extends Event<BudgetSegmentImputationDeletedEventPayload> {
	public static readonly NAME = "budgetSegmentImputation.deleted";

	constructor(payload: BudgetSegmentImputationDeletedEventPayload) {
		super(BudgetSegmentImputationDeletedEvent.NAME, payload);
	}
}

// #endregion
