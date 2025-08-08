import type { UserModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

export type UserUpdatedEventPayload = { userId: UserModel["id"] };

/**
 * Event emitted when a user metadata is updated.
 */
export class UserUpdatedEvent extends Event<UserUpdatedEventPayload> {
	public static readonly NAME = "user.updated";

	constructor(payload: UserUpdatedEventPayload) {
		super(UserUpdatedEvent.NAME, payload);
	}
}

type UserCreatedEventPayload = { userId: UserModel["id"] };

/**
 * Event emitted when a new user is created.
 */
export class UserCreatedEvent extends Event<UserCreatedEventPayload> {
	public static readonly NAME = "user.created";

	constructor(payload: UserCreatedEventPayload) {
		super(UserCreatedEvent.NAME, payload);
	}
}
