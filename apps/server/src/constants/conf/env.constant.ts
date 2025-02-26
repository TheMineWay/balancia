import { Logger } from "@nestjs/common";
import "dotenv/config";
import Zod from "zod";

const DURATION_REGEXP = /^([0-9]+)([smhdw])$/;
const toNum = (value) => Number(value);
const refinedMin = (min: number) => (val: number) => val >= min;

const ENV_SCHEMA = Zod.object({
  // JWT
  JWT_SECRET: Zod.string(),
  JWT_DURATION: Zod.string().regex(DURATION_REGEXP).optional().default("30d"),

  // TOTP
  TOTP_DIGITS: Zod.string().transform(toNum).optional().default("6"),
  TOTP_PERIOD: Zod.string().transform(toNum).optional().default("30"),

  MAX_REQUESTS_PER_MINUTE: Zod.string()
    .optional()
    .default("120")
    .transform(toNum)
    .refine(refinedMin(1)),
  MAX_LOGIN_REQUESTS_PER_MINUTE: Zod.string()
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
});

const TEST_VALUES: Partial<Zod.infer<typeof ENV_SCHEMA>> = {
  DATABASE_URL: "",
  JWT_SECRET: "",
};

export const ENV = (() => {
  let env = process.env as unknown as Zod.infer<typeof ENV_SCHEMA>;

  if (process.env.TEST === "true") {
    env = { ...env, ...TEST_VALUES };
  }

  const values = ENV_SCHEMA.parse(env);

  if (values.LOG_ENV_VALUES) Logger.log("ENV", values);

  return {
    jwt: {
      secret: values.JWT_SECRET,
      duration: values.JWT_DURATION,
    },
    totp: {
      digits: values.TOTP_DIGITS,
      period: values.TOTP_PERIOD,
    },

    rateLimit: {
      maxRequestsPerMinute: values.MAX_REQUESTS_PER_MINUTE,
      maxLoginRequestsPerMinute: values.MAX_LOGIN_REQUESTS_PER_MINUTE,
    },
    database: {
      url: values.DATABASE_URL,
    },
    cors: {
      allowedDomains: values.CORS_ONLY_ALLOW_DOMAINS,
    },
  };
})();
