import type { AccountModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type AccountUpdatedEventPayload = { account: AccountModel };

/**
 * Event emitted when an account is updated.
 */
export class AccountUpdatedEvent extends Event<AccountUpdatedEventPayload> {
	public static readonly EVENT_NAME = "account.updated";

	constructor(payload: AccountUpdatedEventPayload) {
		super(AccountUpdatedEvent.EVENT_NAME, payload);
	}
}

type AccountCreatedEventPayload = { account: AccountModel };

/**
 * Event emitted when an account is created.
 */
export class AccountCreatedEvent extends Event<AccountCreatedEventPayload> {
	public static readonly EVENT_NAME = "account.created";

	constructor(payload: AccountCreatedEventPayload) {
		super(AccountCreatedEvent.EVENT_NAME, payload);
	}
}

type AccountDeletedEventPayload = { accountId: AccountModel["id"] };

/**
 * Event emitted when an account is deleted.
 */
export class AccountDeletedEvent extends Event<AccountDeletedEventPayload> {
	public static readonly EVENT_NAME = "account.deleted";

	constructor(payload: AccountDeletedEventPayload) {
		super(AccountDeletedEvent.EVENT_NAME, payload);
	}
}
