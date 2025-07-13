import { Logger } from "@nestjs/common";
import "dotenv/config";
import { z } from "zod";

const toNum = (value) => Number(value);
const refinedMin = (min: number) => (val: number) => val >= min;

const ENV_SCHEMA = z.object({
  // MAX REQUESTS PER MINUTE
  MAX_REQUESTS_PER_MINUTE: z
    .string()
    .optional()
    .default("120")
    .transform(toNum)
    .refine(refinedMin(1)),
  MAX_JWT_REQUESTS_PER_MINUTE: z
    .string()
    .optional()
    .default("8")
    .transform(toNum)
    .refine(refinedMin(1)),

  DATABASE_URL: z.string(),

  // NODE ENV
  NODE_ENV: z.string().default("production"),

  // DEBUG
  LOG_ENV_VALUES: z.stringbool().default(false),

  // CORS

  CORS_ONLY_ALLOW_DOMAINS: z
    .string()
    .transform((val) => {
      return val.trim().split(",");
    })
    .default(["*"]),

  // AUTHENTICATION
  OIDC_SERVER_HOST: z
    .string()
    .url()
    .transform((val) => (val.endsWith("/") ? val.slice(0, -1) : val))
    .refine((val) => !val.endsWith("/")),
  OIDC_CLIENT_ID: z.string(),
  OIDC_CLIENT_SECRET: z.string(),
  OIDC_ISSUER_URL: z.string().url(),
});

const TEST_VALUES: Partial<z.infer<typeof ENV_SCHEMA>> = {
  DATABASE_URL: "",
  OIDC_SERVER_HOST: "http://localhost:3000",
  OIDC_CLIENT_ID: "test-client-id",
  OIDC_CLIENT_SECRET: "test-client-secret",
  OIDC_ISSUER_URL: "http://localhost:3000",
};

export const ENV = (() => {
  let env = process.env as unknown as z.infer<typeof ENV_SCHEMA>;

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
      issuerUrl: values.OIDC_ISSUER_URL,
    },
  };
})();
