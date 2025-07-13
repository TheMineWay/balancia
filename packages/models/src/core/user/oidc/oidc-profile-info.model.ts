import { z } from "zod";

export const OIDC_PROFILE_INFO_SCHEMA = z.object({
  name: z.string().nullable(),
  given_name: z.string().nullable(),
  preferred_username: z.string().nullable(),
  nickname: z.string().nullable(),

  // Groups
  groups: z.array(z.string()).default([]),

  // Email
  email: z.email().nullable(),
  email_verified: z.boolean().nullable(),
});

export type OidcProfileInfo = z.infer<typeof OIDC_PROFILE_INFO_SCHEMA>;
