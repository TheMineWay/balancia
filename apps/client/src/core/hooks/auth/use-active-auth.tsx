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
  const { context: activeUser, setContext: setActiveUser } = useAuthContext();

  if (!activeUser)
    throw new Error("useActiveAuth must be used when user is logged in");

  const signOut = () => {
    setActiveUser(null);
  };

  const switchTo = (id: number) => {
    const account = storedAccountsContext.findAccount(id);
    if (!account) signOut();

    const { grantedAt: _, ...accountData } = account!;

    setActiveUser(accountData);
  };

  return {
    storedAccounts: Object.values(storedAccountsContext.accounts),
    activeUser,
    setActiveUser,
    token: activeUser.token,
    signOut,
    switchTo,

    storedAccountsContext,
  };
};
