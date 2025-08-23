import type { UserManager } from "oidc-client-ts";
import { createContext, useContext } from "react";

export interface OidcContextInfo {
	manager: UserManager;
}

export const oidcContext = createContext<OidcContextInfo>(null!);

export const useOidc = () => {
	const context = useContext(oidcContext);

	if (!context) {
		throw new Error("useOidc must be used within an OidcProvider");
	}

	return context;
};
