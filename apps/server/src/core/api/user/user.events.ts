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
