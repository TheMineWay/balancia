import { oidcUserManager } from "@common/core/auth/lib/oidc/oidc.manager";
import { Callback } from "@core-fts/callbacks/lib/callback";
import z from "zod";

const LOGIN_SCHEMA = z.object({
	code: z.string(),
	state: z.string(),
	fromUrl: z.string().url().optional(),
});

export const loginCallback = new Callback({
	schema: LOGIN_SCHEMA,
	urlMatcher: /^auth$/,
	onCallback: async (data) => {
		await oidcUserManager.signinCallback();

		window.location.href = data.fromUrl ?? "/";
	},
});
