import { useOidc } from "@providers/auth/oidc.context";
import { useState } from "react";

/**
 * Hook for handling user logout functionality.
 * Manages logout state and performs OIDC signout redirect.
 */
export const useLogout = () => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { manager: oidcUserManager } = useOidc();

	const logout = async () => {
		try {
			setIsLoggingOut(true);
			oidcUserManager.signoutRedirect();
		} catch {
			setIsLoggingOut(false);
		}
	};

	return {
		logout,
		isLoggingOut,
	};
};
