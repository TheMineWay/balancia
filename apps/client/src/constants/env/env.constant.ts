import { z } from "zod";

const COLORS = [
	"default",
	"primary",
	"danger",
	"blue",
	"purple",
	"cyan",
	"green",
	"magenta",
	"pink",
	"red",
	"orange",
	"yellow",
	"volcano",
	"geekblue",
	"lime",
	"gold",
] as const;

const ENV_SCHEMA = z.object({
	VITE_BASE_URL: z.url(),
	VITE_API_HOST: z.url(),

	// AUTH
	VITE_AUTH_AUTHORITY_URL: z.url(),
	VITE_AUTH_PROFILE_URL: z.url().optional(),
	VITE_AUTH_CLIENT_ID: z.string(),
	VITE_AUTH_REDIRECT_SLUG: z.string().default("auth"),
	VITE_AUTH_RESPONSE_TYPE: z.string().default("code"),
	VITE_AUTH_SCOPE: z.string().default("openid profile email"),
	VITE_AUTH_POST_LOGOUT_REDIRECT_URI: z.url().default("/"),

	// AUTH -> UI
	VITE_AUTH_UI_PROVIDER_NAME: z.string().default("SSO"),
	VITE_AUTH_UI_PROVIDER_COLOR: z.enum(COLORS).optional().default("default"),
	VITE_AUTH_UI_PROVIDER_ICON_URL: z.string().nullable().default(null),
	VITE_AUTH_UI_PROVIDER_LOGO_URL: z.url().optional(),

	// USER
	VITE_USER_INFO_STALE_TIME: z
		.string()
		.transform((val) => Number(val))
		.default(1000 * 60 * 15), // 15 minutes

	// DEFAULT
	NODE_ENV: z
		.union([
			z.literal("development"),
			z.literal("production"),
			z.literal("test"),
		])
		.default("production"),
});

const TEST_VALUES: Partial<z.infer<typeof ENV_SCHEMA>> = {
	VITE_API_HOST: "http://localhost:3001",
};

export const ENV = (() => {
	let env = import.meta.env as unknown as z.infer<typeof ENV_SCHEMA>;

	if (env.NODE_ENV === "test") {
		env = { ...env, ...TEST_VALUES };
	}

	const values = ENV_SCHEMA.parse(env);

	return {
		baseUrl: values.VITE_BASE_URL,
		api: {
			host: values.VITE_API_HOST,
		},
		auth: {
			authorityUrl: values.VITE_AUTH_AUTHORITY_URL,
			profileUrl: values.VITE_AUTH_PROFILE_URL,
			clientId: values.VITE_AUTH_CLIENT_ID,
			redirectSlug: values.VITE_AUTH_REDIRECT_SLUG,
			responseType: values.VITE_AUTH_RESPONSE_TYPE,
			scope: values.VITE_AUTH_SCOPE,
			postLogoutRedirectUri: values.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
			ui: {
				providerName: values.VITE_AUTH_UI_PROVIDER_NAME,
				providerColor: values.VITE_AUTH_UI_PROVIDER_COLOR,
				logo: values.VITE_AUTH_UI_PROVIDER_LOGO_URL
			},
		},
		user: {
			infoStaleTime: values.VITE_USER_INFO_STALE_TIME,
		},
		env: env.NODE_ENV,
	};
})();
