import z from "zod";

/**
 * Enumeration representing the status of a debt
 */
export enum DebtStatus {
	/**
	 * The debt is still pending payment
	 */
	PENDING = "pending",
	/**
	 * The debt has been fully paid
	 */
	PAID = "paid",
	/**
	 * The debtor has indicated they will not pay the debt
	 */
	WONT_PAY = "wont-pay",
	/**
	 * The debt has been pardoned or forgiven
	 */
	PARDONED = "pardoned",
}

export const DEBT_STATUS_SCHEMA = z.enum(DebtStatus);
