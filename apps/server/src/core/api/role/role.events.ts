import { Event } from "@core/lib/events/event.abstract";
import type { RoleModel } from "@shared/models";

type RoleUpdatedEventPayload = Pick<RoleModel, "id">;

export class RoleUpdatedEvent extends Event<RoleUpdatedEventPayload> {
  public static readonly NAME = "role.updated";

  constructor(payload: RoleUpdatedEventPayload) {
    super(RoleUpdatedEvent.NAME, payload);
  }
}
