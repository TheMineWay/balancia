import { getOidcUserManager } from "@core/auth/session/lib/oidc/oidc.manager";
import { Callback } from "@core/callbacks/lib/callback";
import z from "zod";

const LOGIN_SCHEMA = z.object({
	code: z.string(),
	state: z.string(),
	fromUrl: z.url().optional(),
});

export const loginCallback = new Callback({
	schema: LOGIN_SCHEMA,
	urlMatcher: /^auth$/,
	onCallback: async (data) => {
		await getOidcUserManager().signinCallback();

		window.location.href = data.fromUrl ?? "/";
	},
});
