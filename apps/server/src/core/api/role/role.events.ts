import type { RoleModel, UserModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type RoleUpdatedEventPayload = Pick<RoleModel, "id">;

export class RoleUpdatedEvent extends Event<RoleUpdatedEventPayload> {
  public static readonly NAME = "role.updated";

  constructor(payload: RoleUpdatedEventPayload) {
    super(RoleUpdatedEvent.NAME, payload);
  }
}

type RoleDeletedEventPayload = Pick<RoleModel, "id">;

export class RoleDeletedEvent extends Event<RoleDeletedEventPayload> {
  public static readonly NAME = "role.deleted";

  constructor(payload: RoleDeletedEventPayload) {
    super(RoleDeletedEvent.NAME, payload);
  }
}

type RoleCreatedEventPayload = Pick<RoleModel, "id">;

export class RoleCreatedEvent extends Event<RoleCreatedEventPayload> {
  public static readonly NAME = "role.created";

  constructor(payload: RoleCreatedEventPayload) {
    super(RoleCreatedEvent.NAME, payload);
  }
}

type RoleAssignedEventPayload = {
  roleId: RoleModel["id"];
  userId: UserModel["id"];
};

export class RoleAssignedEvent extends Event<RoleAssignedEventPayload> {
  public static readonly NAME = "role.assigned";

  constructor(payload: RoleAssignedEventPayload) {
    super(RoleAssignedEvent.NAME, payload);
  }
}

type RoleUnassignedEventPayload = {
  roleId: RoleModel["id"];
  userId: UserModel["id"];
};
export class RoleUnassignedEvent extends Event<RoleUnassignedEventPayload> {
  public static readonly NAME = "role.unassigned";

  constructor(payload: RoleUnassignedEventPayload) {
    super(RoleUnassignedEvent.NAME, payload);
  }
}
