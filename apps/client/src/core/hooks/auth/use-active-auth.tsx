import { useAuthContext } from "@core/providers/auth/auth.context";

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
  const { context: activeAccount, setContext: setActiveAccount } =
    useAuthContext();

  if (!activeAccount)
    throw new Error("useActiveAuth must be used when user is logged in");

  const signOut = () => {
    setActiveAccount(null);
  };

  return {
    activeUser: activeAccount,
    setActiveUser: setActiveAccount,
    user: activeAccount.user,
    token: activeAccount.token,
    signOut,
  };
};
