import { useOidc } from "@providers/auth/oidc.context";
import { useState } from "react";

export const useLogin = () => {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const { manager: oidcUserManager } = useOidc();

	const login = async () => {
		try {
			setIsAuthenticating(true);
			await oidcUserManager.signinRedirect();
		} catch (e) {
			console.error(e);
		} finally {
			setIsAuthenticating(false);
		}
	};

	return {
		login,
		isAuthenticating,
	};
};
