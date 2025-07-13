import Zod, { z } from "zod";

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

const ENV_SCHEMA = Zod.object({
  VITE_BASE_URL: Zod.url(),
  VITE_API_HOST: Zod.url(),

  // AUTH
  VITE_AUTH_AUTHORITY_URL: Zod.url(),
  VITE_AUTH_CLIENT_ID: Zod.string(),
  VITE_AUTH_REDIRECT_SLUG: Zod.string().default("auth"),
  VITE_AUTH_RESPONSE_TYPE: Zod.string().default("code"),
  VITE_AUTH_SCOPE: Zod.string().default("openid profile email"),
  VITE_AUTH_POST_LOGOUT_REDIRECT_URI: Zod.url().default("/"),
  VITE_AUTH_UI_PROVIDER_NAME: Zod.string().default("SSO"),
  VITE_AUTH_UI_PROVIDER_COLOR: Zod.enum(COLORS).optional().default("default"),
  VITE_AUTH_UI_PROVIDER_ICON_URL: Zod.string().nullable().default(null),

  // DEFAULT
  NODE_ENV: Zod.union([
    z.literal("development"),
    z.literal("production"),
    z.literal("test"),
  ]).default("production"),
}).required();

const TEST_VALUES: Partial<Zod.infer<typeof ENV_SCHEMA>> = {
  VITE_API_HOST: "http://localhost:3001",
};

export const ENV = (() => {
  let env = import.meta.env as unknown as Zod.infer<typeof ENV_SCHEMA>;

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
      clientId: values.VITE_AUTH_CLIENT_ID,
      redirectSlug: values.VITE_AUTH_REDIRECT_SLUG,
      responseType: values.VITE_AUTH_RESPONSE_TYPE,
      scope: values.VITE_AUTH_SCOPE,
      postLogoutRedirectUri: values.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
      ui: {
        providerName: values.VITE_AUTH_UI_PROVIDER_NAME,
        providerColor: values.VITE_AUTH_UI_PROVIDER_COLOR,
      },
    },
    env: env.NODE_ENV,
  };
})();
