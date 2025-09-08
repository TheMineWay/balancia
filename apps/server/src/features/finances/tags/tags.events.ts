import { TagModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type TagUpdatedEventPayload = { tag: TagModel };

/**
 * Event emitted when a tag is updated.
 */
export class TagUpdatedEvent extends Event<TagUpdatedEventPayload> {
	public static readonly NAME = "tag.updated";

	constructor(payload: TagUpdatedEventPayload) {
		super(TagUpdatedEvent.NAME, payload);
	}
}

type TagCreatedEventPayload = { tag: TagModel };

/**
 * Event emitted when a tag is created.
 */
export class TagCreatedEvent extends Event<TagCreatedEventPayload> {
	public static readonly NAME = "tag.created";

	constructor(payload: TagCreatedEventPayload) {
		super(TagCreatedEvent.NAME, payload);
	}
}
type TagDeletedEventPayload = { tagId: TagModel["id"] };

/**
 * Event emitted when a tag is deleted.
 */
export class TagDeletedEvent extends Event<TagDeletedEventPayload> {
	public static readonly NAME = "tag.deleted";

	constructor(payload: TagDeletedEventPayload) {
		super(TagDeletedEvent.NAME, payload);
	}
}
