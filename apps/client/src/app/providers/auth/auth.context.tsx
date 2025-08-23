import type { ProviderSetter } from "@providers/provider-setter.type";
import { OIDC_USER_SCHEMA } from "@shared/models";
import type { UserManager } from "oidc-client-ts";
import { createContext, useContext } from "react";
import type { z } from "zod";

export const authContext = createContext<
	Omit<ProviderSetter<AuthContextInfo | null>, "setContext">
>(null!);

export const AUTH_CONTEXT_INFO_SCHEMA = OIDC_USER_SCHEMA;

export type AuthContextInfo = Omit<
	z.infer<typeof AUTH_CONTEXT_INFO_SCHEMA>,
	"access_token"
> & { accessToken: () => string; oidcManager: UserManager };

export const useAuthContext = () => {
	const context = useContext(authContext);

	if (!context) {
		throw new Error("useAuthContext must be used within a AuthProvider");
	}

	return context;
};
