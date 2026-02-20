import type { BudgetSegmentCategoryAutoMatcherModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

export type BudgetSegmentCategoryAutoMatcherCreatedEventPayload = {
	matcher: BudgetSegmentCategoryAutoMatcherModel;
};

export class BudgetSegmentCategoryAutoMatcherCreatedEvent extends Event<BudgetSegmentCategoryAutoMatcherCreatedEventPayload> {
	public static readonly NAME = "budget-segment-category-auto-matcher.created";

	constructor(payload: BudgetSegmentCategoryAutoMatcherCreatedEventPayload) {
		super(BudgetSegmentCategoryAutoMatcherCreatedEvent.NAME, payload);
	}
}

export type BudgetSegmentCategoryAutoMatcherDeletedEventPayload = {
	segmentId: BudgetSegmentCategoryAutoMatcherModel["segmentId"];
	categoryId: BudgetSegmentCategoryAutoMatcherModel["categoryId"];
};

export class BudgetSegmentCategoryAutoMatcherDeletedEvent extends Event<BudgetSegmentCategoryAutoMatcherDeletedEventPayload> {
	public static readonly NAME = "budget-segment-category-auto-matcher.deleted";

	constructor(payload: BudgetSegmentCategoryAutoMatcherDeletedEventPayload) {
		super(BudgetSegmentCategoryAutoMatcherDeletedEvent.NAME, payload);
	}
}
