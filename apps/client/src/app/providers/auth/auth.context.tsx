import type { ProviderSetter } from "@providers/provider-setter.type";
import { OIDC_USER_SCHEMA } from "@shared/models";
import { createContext, useContext } from "react";
import type { z } from "zod";

export const authContext = createContext<
  Omit<ProviderSetter<AuthContextInfo | null>, "setContext">
>(null!);

export const AUTH_CONTEXT_INFO_SCHEMA = OIDC_USER_SCHEMA;

export type AuthContextInfo = z.infer<typeof AUTH_CONTEXT_INFO_SCHEMA>;

export const useAuthContext = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
