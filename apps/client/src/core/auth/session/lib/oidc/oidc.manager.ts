import { ENV } from "@constants/env/env.constant";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const getOidcUserManager = () => { const manager = new UserManager({
	authority: ENV.auth.authorityUrl,
	client_id: ENV.auth.clientId,
	redirect_uri: ENV.baseUrl + "/_callback/" + ENV.auth.redirectSlug,
	response_type: ENV.auth.responseType,
	scope: ENV.auth.scope,
	post_logout_redirect_uri: ENV.auth.postLogoutRedirectUri,
	automaticSilentRenew: true,
	userStore: new WebStorageStateStore({ store: window.localStorage }),
});

console.log('created OIDC manager instance')
return manager;
}
