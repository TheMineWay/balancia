import { ProviderSetter } from "@core/providers/provider-setter.type";
import { USER_SCHEMA } from "@shared/models";
import { createContext, useContext } from "react";
import { object, string, z } from "zod";

export const AUTH_CONTEXT = createContext<
  ProviderSetter<AuthContextInfo | null>
>(null!);

export const AUTH_CONTEXT_INFO_SCHEMA = object({
  token: string(),
  user: USER_SCHEMA,
});

export type AuthContextInfo = z.infer<typeof AUTH_CONTEXT_INFO_SCHEMA>;

export const useAuthContext = () => {
  const context = useContext(AUTH_CONTEXT);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
