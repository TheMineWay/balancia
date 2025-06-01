import { Logger } from "@nestjs/common";
import "dotenv/config";
import Zod from "zod";

const toNum = (value) => Number(value);
const refinedMin = (min: number) => (val: number) => val >= min;

const ENV_SCHEMA = Zod.object({
  // MAX REQUESTS PER MINUTE
  MAX_REQUESTS_PER_MINUTE: Zod.string()
    .optional()
    .default("120")
    .transform(toNum)
    .refine(refinedMin(1)),
  MAX_JWT_REQUESTS_PER_MINUTE: Zod.string()
    .optional()
    .default("8")
    .transform(toNum)
    .refine(refinedMin(1)),

  DATABASE_URL: Zod.string(),

  // NODE ENV
  NODE_ENV: Zod.string().default("production"),

  // DEBUG
  LOG_ENV_VALUES: Zod.string()
    .refine((val) => val === "true" || val === "false", {
      message: 'Value must be "true" or "false"',
    })
    .transform((val) => val === "true")
    .default("false"),

  // CORS

  CORS_ONLY_ALLOW_DOMAINS: Zod.string()
    .transform((val) => {
      return val.trim().split(",");
    })
    .default("*"),

  // AUTHENTICATION
  OIDC_SERVER_HOST: Zod.string()
    .url()
    .transform((val) => (val.endsWith("/") ? val.slice(0, -1) : val))
    .refine((val) => !val.endsWith("/")),
  OIDC_CLIENT_ID: Zod.string(),
  OIDC_CLIENT_SECRET: Zod.string(),
  OIDC_GRANT_TYPE: Zod.string().default("authorization_code"),
  OIDC_REDIRECT_URI: Zod.string().url(),
});

const TEST_VALUES: Partial<Zod.infer<typeof ENV_SCHEMA>> = {
  DATABASE_URL: "",
  OIDC_SERVER_HOST: "http://localhost:3000",
  OIDC_CLIENT_ID: "test-client-id",
  OIDC_CLIENT_SECRET: "test-client-secret",
  OIDC_REDIRECT_URI: "http://localhost:3000/_text-callback/auth",
};

export const ENV = (() => {
  let env = process.env as unknown as Zod.infer<typeof ENV_SCHEMA>;

  if (process.env.TEST === "true") {
    env = { ...env, ...TEST_VALUES };
  }

  const values = ENV_SCHEMA.parse(env);

  if (values.LOG_ENV_VALUES) Logger.log("ENV", values);

  return {
    rateLimit: {
      maxRequestsPerMinute: values.MAX_REQUESTS_PER_MINUTE,
      maxJwtRequestsPerMinute: values.MAX_JWT_REQUESTS_PER_MINUTE,
    },
    database: {
      url: values.DATABASE_URL,
    },
    cors: {
      allowedDomains: values.CORS_ONLY_ALLOW_DOMAINS,
    },
    oidc: {
      host: values.OIDC_SERVER_HOST,
      clientId: values.OIDC_CLIENT_ID,
      clientSecret: values.OIDC_CLIENT_SECRET,
      grantType: values.OIDC_GRANT_TYPE,
      redirectUri: values.OIDC_REDIRECT_URI,
    },
  };
})();
