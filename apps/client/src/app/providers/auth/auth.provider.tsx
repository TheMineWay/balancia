import Auth from "@common/core/auth/components/auth";
import {
  authContext,
  type AuthContextInfo,
} from "@providers/auth/auth.context";
import { useOidc } from "@providers/auth/oidc.context";
import { OIDC_USER_SCHEMA } from "@shared/models";
import type { UserManager } from "oidc-client-ts";
import { useEffect, useState } from "react";
import type { WithChildren } from "src/common/types/component/component.types";

export default function AuthProvider({ children }: Readonly<WithChildren>) {
  const [contextState, setContextState] = useState<AuthContextInfo | null>();
  const { manager } = useOidc();

  useEffect(() => {
    readCurrentAuthData(manager)
      .then(setContextState)
      .catch(() => setContextState(null));
  }, [manager]);

  if (contextState === undefined) return null;
  if (contextState === null) return <Auth />;

  return (
    <authContext.Provider value={{ context: contextState }}>
      {children}
    </authContext.Provider>
  );
}

const readCurrentAuthData = async (
  manager: UserManager
): Promise<AuthContextInfo | null> => {
  try {
    const user = await manager.getUser();
    if (!user) return null;

    return {
      ...OIDC_USER_SCHEMA.parse(user),
      accessToken: () => user.access_token,
      oidcManager: manager,
    };
  } catch {
    return null;
  }
};
