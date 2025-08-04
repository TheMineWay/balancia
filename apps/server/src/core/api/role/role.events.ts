import type { RoleModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type RoleUpdatedEventPayload = Pick<RoleModel, "id">;

export class RoleUpdatedEvent extends Event<RoleUpdatedEventPayload> {
  public static readonly NAME = "role.updated";

  constructor(payload: RoleUpdatedEventPayload) {
    super(RoleUpdatedEvent.NAME, payload);
  }
}
