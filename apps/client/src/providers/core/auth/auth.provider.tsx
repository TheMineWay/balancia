import Auth from "@components/core/auth/auth";
import { useStoredAccounts } from "@providers/core/auth/stored-accounts.provider";
import { ProviderSetter } from "@providers/provider-setter.type";
import { UserModel } from "@shared/models";
import { WithChildren } from "@ts-types/common/component.types";
import { createContext, useState } from "react";

const Context = createContext<ProviderSetter<AuthContextInfo>>(null!);

export default function AuthProvider({ children }: Readonly<WithChildren>) {
  const [context, setContextState] = useState<AuthContextInfo>();
  const { addAccount } = useStoredAccounts();

  const setContext = (info: AuthContextInfo) => {
    addAccount(info);
    setContextState(info);
  };

  if (!context) return <Auth setAuthContext={setContext} />;

  return (
    <Context.Provider value={{ context, setContext }}>
      {children}
    </Context.Provider>
  );
}

export interface AuthContextInfo {
  token: string;
  user: UserModel;
}
