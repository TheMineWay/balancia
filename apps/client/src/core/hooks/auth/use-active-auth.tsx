import { useAuthContext } from "@core/providers/auth/auth.context";
import { useStoredAccounts } from "@core/providers/auth/stored-account.context";

/**
 * A hook used to interact with the active authentication state.
 *
 * This hook provides functionalities for:
 * - Accessing stored accounts
 * - Managing the active user
 * - Signing out
 *
 * Note: This hook should only be used in components where the user is always authenticated.
 *
 * @throws {Error} If the hook is used when the user is not logged in.
 *
 * @returns {object} The active authentication state and functions to interact with it.
 */
export const useActiveAuth = () => {
  const storedAccountsContext = useStoredAccounts();
  const { context: activeAccount, setContext: setActiveAccount } =
    useAuthContext();

  if (!activeAccount)
    throw new Error("useActiveAuth must be used when user is logged in");

  const signOut = () => {
    setActiveAccount(null);
  };

  const switchTo = (id: number) => {
    const account = storedAccountsContext.findAccount(id);
    if (!account) signOut();

    const { grantedAt: _, ...accountData } = account!;

    setActiveAccount(accountData);
  };

  return {
    storedAccounts: Object.values(storedAccountsContext.accounts),
    activeUser: activeAccount,
    setActiveUser: setActiveAccount,
    user: activeAccount.user,
    token: activeAccount.token,
    signOut,
    switchTo,

    storedAccountsContext,
  };
};
