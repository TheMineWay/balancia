import { AccountModel } from "@shared/models";

/**
 * Given an array of accounts, returns the preferred account.
 */
export const getPreferredAccount = (
	accounts: AccountModel[],
): AccountModel | null => {
	if (accounts.length === 0) return null;

	// TODO: implement user preferences for preferred account when they are available
	return accounts[0];
};
