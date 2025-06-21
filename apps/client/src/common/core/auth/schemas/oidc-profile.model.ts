import { DATE_SCHEMA } from "@shared/models";
import z from "zod";

export const OIDC_PROFILE_SCHEMA = z.object({
  // Token
  iss: z.string().url(),
  sub: z.string(),
  aud: z.string(),
  exp: DATE_SCHEMA,
  iat: DATE_SCHEMA,
  sid: z.string().nullable(),

  // User info
  name: z.string().nullable(),
  given_name: z.string().nullable(),
  preferred_username: z.string().nullable(),
  nickname: z.string().nullable(),

  // Groups
  groups: z.array(z.string()).default([]),

  // Email
  email: z.string().email().nullable(),
  email_verified: z.boolean().nullable(),
});

export type OidcProfile = z.infer<typeof OIDC_PROFILE_SCHEMA>;
