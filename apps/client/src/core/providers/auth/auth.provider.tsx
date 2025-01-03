import Auth from "@core/components/auth/auth";
import {
  AUTH_CONTEXT,
  AuthContextInfo,
} from "@core/providers/auth/auth.context";
import { useStoredAccounts } from "@core/providers/auth/stored-account.context";
import { WithChildren } from "@core/types/common/component.types";
import { useState } from "react";

export default function AuthProvider({ children }: Readonly<WithChildren>) {
  const [context, setContextState] = useState<AuthContextInfo>();
  const { addAccount } = useStoredAccounts();

  const setContext = (info: AuthContextInfo) => {
    addAccount(info);
    setContextState(info);
  };

  if (!context) return <Auth setAuthContext={setContext} />;

  return (
    <AUTH_CONTEXT.Provider value={{ context, setContext }}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
}
