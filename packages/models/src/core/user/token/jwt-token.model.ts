import { z } from "zod";

const D_SCHEMA = z
  .number() // expects a number (Unix timestamp or YYYYMMDD)
  .refine((num) => num > 0, {
    message: "Expiration date must be a valid Unix timestamp or YYYYMMDD",
  })
  .transform((num) => {
    const str = num.toString();
    if (str.length === 8) {
      // If it's in YYYYMMDD format, convert to a Date object
      const year = parseInt(str.slice(0, 4), 10);
      const month = parseInt(str.slice(4, 6), 10) - 1; // JS months are 0-based
      const day = parseInt(str.slice(6, 8), 10);
      return new Date(Date.UTC(year, month, day)); // Return Date object
    }
    // If it's already a Unix timestamp, convert it to a Date object
    return new Date(num * 1000); // Convert from seconds to milliseconds
  });

export const JWT_TOKEN_SCHEMA = z.object({
  iss: z.string().url(), // issuer
  sub: z.string(), // subject (user ID)
  aud: z.string(), // audience (client ID)
  exp: D_SCHEMA, // expiration time (UNIX timestamp)
  iat: D_SCHEMA, // issued at
  auth_time: z.number(), // authentication time
  acr: z.string(), // authentication context class reference
  amr: z.array(z.string()), // authentication methods references
  sid: z.string(), // session ID
  email: z.string().email(),
  email_verified: z.boolean(),
  name: z.string().nonempty(),
  given_name: z.string(),
  preferred_username: z.string(),
  nickname: z.string(),
  groups: z.array(z.string()),
  azp: z.string(), // authorized party
  uid: z.string().nonempty(),
});

export type JwtToken = z.infer<typeof JWT_TOKEN_SCHEMA>;
