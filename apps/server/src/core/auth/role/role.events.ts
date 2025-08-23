import type { RoleModel, UserModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type RoleUpdatedEventPayload = { roleId: RoleModel["id"] };

/**
 * Event emitted when a role metadata is updated.
 */
export class RoleUpdatedEvent extends Event<RoleUpdatedEventPayload> {
	public static readonly NAME = "role.updated";

	constructor(payload: RoleUpdatedEventPayload) {
		super(RoleUpdatedEvent.NAME, payload);
	}
}

type RoleDeletedEventPayload = { roleId: RoleModel["id"] };

/**
 * Event emitted when a role is permanently deleted.
 */
export class RoleDeletedEvent extends Event<RoleDeletedEventPayload> {
	public static readonly NAME = "role.deleted";

	constructor(payload: RoleDeletedEventPayload) {
		super(RoleDeletedEvent.NAME, payload);
	}
}

type RoleCreatedEventPayload = { roleId: RoleModel["id"] };

/**
 * Event emitted when a new role is created.
 */
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

/**
 * Event emitted when a role is assigned to a user.
 */
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

/**
 * Event emitted when a role is unassigned from a user.
 */
export class RoleUnassignedEvent extends Event<RoleUnassignedEventPayload> {
	public static readonly NAME = "role.unassigned";

	constructor(payload: RoleUnassignedEventPayload) {
		super(RoleUnassignedEvent.NAME, payload);
	}
}

type RolePermissionsUpdatedEventPayload = { roleId: RoleModel["id"] };

/**
 * Event emitted when a role's permissions are updated.
 */
export class RolePermissionsUpdatedEvent extends Event<RolePermissionsUpdatedEventPayload> {
	public static readonly NAME = "role.permissions.updated";

	constructor(payload: RolePermissionsUpdatedEventPayload) {
		super(RolePermissionsUpdatedEvent.NAME, payload);
	}
}
