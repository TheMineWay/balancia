import { Logger } from "@nestjs/common";
import "dotenv/config";
import Zod from "zod";

const ENV_SCHEMA = Zod.object({
  JWT_SECRET: Zod.string(),
  JWT_DURATION: Zod.string()
    .regex(/^([0-9]+)([smhdw])$/)
    .optional()
    .default("30d"),

  MAX_REQUESTS_PER_MINUTE: Zod.number().min(1).optional().default(120),
  MAX_LOGIN_REQUESTS_PER_MINUTE: Zod.number().min(1).optional().default(8),

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

export const ENV = (() => {
  const values = ENV_SCHEMA.parse(process.env);

  if (values.LOG_ENV_VALUES) Logger.log("ENV", values);

  return {
    jwtSecret: values.JWT_SECRET as string,
    jwtDuration: (values.JWT_SECRET as string) ?? "30d",

    rateLimit: {
      maxRequestsPerMinute: values.MAX_REQUESTS_PER_MINUTE,
      maxLoginRequestsPerMinute: values.MAX_LOGIN_REQUESTS_PER_MINUTE,
    },
  };
})();
