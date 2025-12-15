import type { ContactModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type ContactUpdatedEventPayload = {
	contact: ContactModel;
};

/**
 * Event emitted when a contact is updated
 */
export class ContactUpdatedEvent extends Event<ContactUpdatedEventPayload> {
	public static readonly NAME = "contact.updated";

	constructor(payload: ContactUpdatedEventPayload) {
		super(ContactUpdatedEvent.NAME, payload);
	}
}

type ContactCreatedEventPayload = {
	contact: ContactModel;
};

/**
 * Event emitted when a contact is created
 */
export class ContactCreatedEvent extends Event<ContactCreatedEventPayload> {
	public static readonly NAME = "contact.created";

	constructor(payload: ContactCreatedEventPayload) {
		super(ContactCreatedEvent.NAME, payload);
	}
}

type ContactDeletedEventPayload = { contactId: ContactModel["id"] };

/**
 * Event emitted when a contact is deleted
 */
export class ContactDeletedEvent extends Event<ContactDeletedEventPayload> {
	public static readonly NAME = "contact.deleted";

	constructor(payload: ContactDeletedEventPayload) {
		super(ContactDeletedEvent.NAME, payload);
	}
}
