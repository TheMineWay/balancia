import { ProviderSetter } from "@core/providers/provider-setter.type";
import { USER_SCHEMA } from "@shared/models";
import { createContext } from "react";
import { object, string, z } from "zod";

export const AUTH_CONTEXT = createContext<ProviderSetter<AuthContextInfo>>(
  null!
);

export const AUTH_CONTEXT_INFO_SCHEMA = object({
  token: string(),
  user: USER_SCHEMA,
});

export type AuthContextInfo = z.infer<typeof AUTH_CONTEXT_INFO_SCHEMA>;
