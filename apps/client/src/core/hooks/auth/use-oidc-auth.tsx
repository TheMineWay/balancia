import { oidcUserManager } from "@core/components/auth/sign-in/authentik/oidc.manager";
import { useState } from "react";

export const useOidcAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const login = async () => {
    try {
      setIsAuthenticating(true);
      await oidcUserManager.signinRedirect({
        extraQueryParams: { fromUrl: window.location.pathname },
      });
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
