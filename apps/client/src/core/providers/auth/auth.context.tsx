import { ProviderSetter } from "@core/providers/provider-setter.type";
import { UserModel } from "@shared/models";
import { createContext } from "react";

export const AUTH_CONTEXT = createContext<ProviderSetter<AuthContextInfo>>(
  null!
);

export interface AuthContextInfo {
  token: string;
  user: UserModel;
}
