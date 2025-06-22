import { DATE_SCHEMA } from "@/utils";
import { z } from "zod";

export const JWT_TOKEN_SCHEMA = z.object({
  iss: z.string().url(), // issuer
  sub: z.string(), // subject (user ID)
  aud: z.string(), // audience (client ID)
  exp: DATE_SCHEMA, // expiration time (UNIX timestamp)
  iat: DATE_SCHEMA, // issued at
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
