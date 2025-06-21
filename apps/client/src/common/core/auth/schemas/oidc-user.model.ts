import { OIDC_PROFILE_SCHEMA } from "@common/core/auth/schemas/oidc-profile.model";
import { DATE_SCHEMA } from "@shared/models";
import { z } from "zod";

export const OIDC_USER_SCHEMA = z.object({
  // Token info
  id_token: z.string(),
  session_state: z.string().nullable(),
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  scope: z.string(),

  // Profile
  profile: OIDC_PROFILE_SCHEMA,

  // Additional fields
  expires_at: DATE_SCHEMA,
});

export type OidcUser = z.infer<typeof OIDC_USER_SCHEMA>;
