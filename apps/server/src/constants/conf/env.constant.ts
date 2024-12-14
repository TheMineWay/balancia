import { parseOptionalNumber } from "@shared/utils";

export const ENV = {
  jwtSecret: process.env.JWT_SECRET as string,
  jwtDuration: (process.env.JWT_SECRET as string) ?? "30d",

  rateLimit: {
    maxRequestsPerMinute: parseOptionalNumber(
      process.env.MAX_REQUESTS_PER_MINUTE,
      120
    ),
  },
};
