import { useUserAccountInfoQuery } from "@core/hooks/api/user/use-user-account-info.query";
import { useAuthContext } from "@core/providers/auth/auth.context";
import { useStoredAccounts } from "@core/providers/auth/stored-account.context";
import { isEqual } from "lodash";
import { useEffect, useTransition } from "react";

/**
 * This hook ensures stored account info stays updated with changes that occur after info storage.
 *
 * IT MANAGES:
 * - Session storage.
 * - Local storage.
 * - Auth context.
 */
export const useSyncAccountInfo = () => {
  const { context: authContext, setContext: setAuthContext } = useAuthContext();
  const { updateAccount } = useStoredAccounts();
  const { data: updatedAccountInfo } = useUserAccountInfoQuery();

  const [, startTransition] = useTransition();

  /**
   * Every time account info changes, update stored accounts and context.
   */
  useEffect(() => {
    // If no fresh data is loaded or no existing context is present, exit
    if (!updatedAccountInfo || !authContext) return;

    const newContext = { ...authContext, user: updatedAccountInfo };

    // If current context does match the new context, exit
    if (isEqual(authContext, newContext)) return;

    startTransition(() => {
      updateAccount(newContext.user.id, newContext);

      // Update context
      setAuthContext(newContext);
    });
  }, [
    authContext,
    setAuthContext,
    updatedAccountInfo,
    startTransition,
    updateAccount,
  ]);
};
