import { DebtModel, DebtOriginModel, DebtPaymentModel } from "@shared/models";
import { Event } from "src/events/event.abstract";

// #region Debt

type DebtUpdatedEventPayload = {
	debt: DebtModel;
};

/**
 * Event emitted when a debt is updated
 */
export class DebtUpdatedEvent extends Event<DebtUpdatedEventPayload> {
	public static readonly NAME = "debt.updated";

	constructor(payload: DebtUpdatedEventPayload) {
		super(DebtUpdatedEvent.NAME, payload);
	}
}

type DebtCreatedEventPayload = {
	debt: DebtModel;
};

/**
 * Event emitted when a debt is created
 */
export class DebtCreatedEvent extends Event<DebtCreatedEventPayload> {
	public static readonly NAME = "debt.created";

	constructor(payload: DebtCreatedEventPayload) {
		super(DebtCreatedEvent.NAME, payload);
	}
}

type DebtDeletedEventPayload = { debtId: DebtModel["id"] };

/**
 * Event emitted when a debt is deleted
 */
export class DebtDeletedEvent extends Event<DebtDeletedEventPayload> {
	public static readonly NAME = "debt.deleted";

	constructor(payload: DebtDeletedEventPayload) {
		super(DebtDeletedEvent.NAME, payload);
	}
}

// #endregion

// #region Debt Payment

type DebtPaymentCreatedEventPayload = {
	payment: DebtPaymentModel;
};

/**
 * Event emitted when a debt payment is created
 */
export class DebtPaymentCreatedEvent extends Event<DebtPaymentCreatedEventPayload> {
	public static readonly NAME = "debt.payment.created";

	constructor(payload: DebtPaymentCreatedEventPayload) {
		super(DebtPaymentCreatedEvent.NAME, payload);
	}
}

type DebtPaymentDeletedEventPayload = {
	payment: DebtPaymentModel;
};

/**
 * Event emitted when a debt payment is deleted
 */
export class DebtPaymentDeletedEvent extends Event<DebtPaymentDeletedEventPayload> {
	public static readonly NAME = "debt.payment.deleted";

	constructor(payload: DebtPaymentDeletedEventPayload) {
		super(DebtPaymentDeletedEvent.NAME, payload);
	}
}

// #endregion

// #region Debt origin

type DebtOriginCreatedEventPayload = {
	origin: DebtOriginModel;
};

/**
 * Event emitted when a debt origin is created
 */
export class DebtOriginCreatedEvent extends Event<DebtOriginCreatedEventPayload> {
	public static readonly NAME = "debt.origin.created";

	constructor(payload: DebtOriginCreatedEventPayload) {
		super(DebtOriginCreatedEvent.NAME, payload);
	}
}

type DebtOriginDeletedEventPayload = {
	origin: DebtOriginModel;
};

/**
 * Event emitted when a debt origin is deleted
 */
export class DebtOriginDeletedEvent extends Event<DebtOriginDeletedEventPayload> {
	public static readonly NAME = "debt.origin.deleted";

	constructor(payload: DebtOriginDeletedEventPayload) {
		super(DebtOriginDeletedEvent.NAME, payload);
	}
}

// #endregion
