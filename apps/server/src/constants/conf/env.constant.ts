import { Logger } from "@nestjs/common";
import "dotenv/config";
import Zod from "zod";

const ENV_SCHEMA = Zod.object({
  // JWT
  JWT_SECRET: Zod.string(),
  JWT_DURATION: Zod.string()
    .regex(/^([0-9]+)([smhdw])$/)
    .optional()
    .default("30d"),

  // TOTP
  TOTP_DIGITS: Zod.string()
    .transform((value) => Number(value))
    .optional()
    .default("6"),
  TOTP_PERIOD: Zod.string()
    .transform((value) => Number(value))
    .optional()
    .default("30"),

  MAX_REQUESTS_PER_MINUTE: Zod.number().min(1).optional().default(120),
  MAX_LOGIN_REQUESTS_PER_MINUTE: Zod.number().min(1).optional().default(8),

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
    jwtSecret: values.JWT_SECRET,
    jwtDuration: values.JWT_SECRET,
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
  };
})();
