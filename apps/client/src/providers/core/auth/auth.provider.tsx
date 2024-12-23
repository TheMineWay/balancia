import Auth from "@components/core/auth/auth";
import { ProviderSetter } from "@providers/provider-setter.type";
import { UserModel } from "@shared/models";
import { WithChildren } from "@ts-types/common/component.types";
import { createContext, useState } from "react";

const Context = createContext<ProviderSetter<AuthContextInfo>>(null!);

export default function AuthProvider({ children }: Readonly<WithChildren>) {
  const [context, setContext] = useState<AuthContextInfo>();

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
