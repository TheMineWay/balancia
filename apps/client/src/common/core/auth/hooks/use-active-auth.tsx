import { oidcUserManager } from "@common/core/auth/lib/oidc/oidc.manager";
import { useAuthContext } from "@providers/auth/auth.context";

/**
 * A hook used to interact with the active authentication state.
 *
 * This hook provides functionalities for:
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
  const { context: account } = useAuthContext();

  if (!account)
    throw new Error("useActiveAuth must be used when user is logged in");

  const signOut = () => {
    oidcUserManager.signoutRedirect();
  };

  return {
    activeUser: account,
    user: account.profile,
    token: account.access_token,
    signOut,
  };
};
