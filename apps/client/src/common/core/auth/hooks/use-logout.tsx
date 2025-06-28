import { getOidcUserManager } from "@common/core/auth/lib/oidc/oidc.manager";
import { useState } from "react";

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      getOidcUserManager().signoutRedirect();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut,
  };
};
