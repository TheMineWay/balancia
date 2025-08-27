import { CategoryModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type CategoryUpdatedEventPayload = { category: CategoryModel };

/**
 * Event emitted when a category is updated.
 */
export class CategoryUpdatedEvent extends Event<CategoryUpdatedEventPayload> {
	public static readonly NAME = "category.updated";

	constructor(payload: CategoryUpdatedEventPayload) {
		super(CategoryUpdatedEvent.NAME, payload);
	}
}

type CategoryCreatedEventPayload = { category: CategoryModel };

/**
 * Event emitted when a category is created.
 */
export class CategoryCreatedEvent extends Event<CategoryCreatedEventPayload> {
	public static readonly NAME = "category.created";

	constructor(payload: CategoryCreatedEventPayload) {
		super(CategoryCreatedEvent.NAME, payload);
	}
}

type CategoryDeletedEventPayload = { categoryId: number };

/**
 * Event emitted when a category is deleted.
 */
export class CategoryDeletedEvent extends Event<CategoryDeletedEventPayload> {
	public static readonly NAME = "category.deleted";

	constructor(payload: CategoryDeletedEventPayload) {
		super(CategoryDeletedEvent.NAME, payload);
	}
}
