import Auth from "@core-fts/auth/components/auth";
import {
  AUTH_CONTEXT_INFO_SCHEMA,
  authContext,
  type AuthContextInfo,
} from "@providers/auth/auth.context";
import { useCallback, useState } from "react";
import type { WithChildren } from "src/common/types/component/component.types";

/**
 * Stores in SESSION STORAGE the current auth info.
 * It includes:
 * - Auth token.
 * - User info (USER_SCHEMA).
 */
const SESSION_STORAGE_KEY = "active-auth-info";

export default function AuthProvider({ children }: Readonly<WithChildren>) {
  const [contextState, setContextState] = useState<AuthContextInfo | null>(
    readCurrentAuthData()
  );

  const setContext = useCallback((info: AuthContextInfo | null) => {
    setCurrentAuthData(info);
    setContextState(info);
  }, []);

  if (!contextState) return <Auth setAuthContext={setContext} />;

  return (
    <authContext.Provider value={{ context: contextState, setContext }}>
      {children}
    </authContext.Provider>
  );
}

const readCurrentAuthData = (): AuthContextInfo | null => {
  try {
    const rawData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawData) return null;

    const parsed = JSON.parse(rawData);

    return AUTH_CONTEXT_INFO_SCHEMA.parse(parsed);
  } catch {
    return null;
  }
};

const setCurrentAuthData = (data: AuthContextInfo | null) => {
  if (data) sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
  else sessionStorage.removeItem(SESSION_STORAGE_KEY);
};
