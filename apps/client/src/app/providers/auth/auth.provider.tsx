import Auth from "@common/core/auth/components/auth";
import { oidcUserManager } from "@common/core/auth/lib/oidc/oidc.manager";
import { OIDC_USER_SCHEMA } from "@common/core/auth/schemas/oidc-user.model";
import {
  authContext,
  type AuthContextInfo,
} from "@providers/auth/auth.context";
import { useEffect, useState } from "react";
import type { WithChildren } from "src/common/types/component/component.types";

/**
 * Stores in SESSION STORAGE the current auth info.
 * It includes:
 * - Auth token.
 * - User info (USER_SCHEMA).
 */
const SESSION_STORAGE_KEY = "active-auth-info";

export default function AuthProvider({ children }: Readonly<WithChildren>) {
  const [contextState, setContextState] = useState<AuthContextInfo | null>();

  useEffect(() => {
    readCurrentAuthData()
      .then(setContextState)
      .catch(() => setContextState(null));
  }, []);

  if (contextState === undefined) return null;
  if (contextState === null) return <Auth />;

  return (
    <authContext.Provider value={{ context: contextState }}>
      {children}
    </authContext.Provider>
  );
}

const readCurrentAuthData = async (): Promise<AuthContextInfo | null> => {
  try {
    const user = await oidcUserManager.getUser();
    if (!user) return null;

    return OIDC_USER_SCHEMA.parse(user);
  } catch {
    return null;
  }
};
