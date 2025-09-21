import type { OwnedModel, TransactionModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

type TransactionUpdatedEventPayload = {
	transaction: OwnedModel<TransactionModel>;
};

/**
 * Event emitted when a transaction is updated
 */
export class TransactionUpdatedEvent extends Event<TransactionUpdatedEventPayload> {
	public static readonly NAME = "transaction.updated";

	constructor(payload: TransactionUpdatedEventPayload) {
		super(TransactionUpdatedEvent.NAME, payload);
	}
}

type TransactionCreatedEventPayload = {
	transaction: OwnedModel<TransactionModel>;
};

/**
 * Event emitted when a transaction is created
 */
export class TransactionCreatedEvent extends Event<TransactionCreatedEventPayload> {
	public static readonly NAME = "transaction.created";

	constructor(payload: TransactionCreatedEventPayload) {
		super(TransactionCreatedEvent.NAME, payload);
	}
}

type TransactionDeletedEventPayload = { transactionId: TransactionModel["id"] };

/**
 * Event emitted when a transaction is deleted
 */
export class TransactionDeletedEvent extends Event<TransactionDeletedEventPayload> {
	public static readonly NAME = "transaction.deleted";

	constructor(payload: TransactionDeletedEventPayload) {
		super(TransactionDeletedEvent.NAME, payload);
	}
}
