import { ENV } from "@constants/env/env.constant";
import { UserManager } from "oidc-client-ts";

export const oidcUserManager = new UserManager({
  authority: ENV.auth.authorityUrl,
  client_id: ENV.auth.clientId,
  redirect_uri: ENV.baseUrl + "/_callback/" + ENV.auth.redirectSlug,
  response_type: ENV.auth.responseType,
  scope: ENV.auth.scope,
  post_logout_redirect_uri: ENV.auth.postLogoutRedirectUri,
  automaticSilentRenew: true,
});
