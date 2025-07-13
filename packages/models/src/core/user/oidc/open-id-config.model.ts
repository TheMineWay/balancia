import { z } from "zod";

export const OPEN_ID_CONFIG_SCHEMA = z.object({
  issuer: z.url(),
  authorization_endpoint: z.url(),
  token_endpoint: z.url(),
  userinfo_endpoint: z.url().optional(),
  end_session_endpoint: z.url().optional(),
  introspection_endpoint: z.url().optional(),
  revocation_endpoint: z.url().optional(),
  device_authorization_endpoint: z.url().optional(),

  response_types_supported: z.array(
    z.enum([
      "code",
      "id_token",
      "token",
      "code token",
      "code id_token",
      "id_token token",
      "code id_token token",
    ])
  ),

  response_modes_supported: z.array(
    z.enum(["query", "fragment", "form_post", "jwt"])
  ),

  jwks_uri: z.url(),

  grant_types_supported: z.array(
    z.enum([
      "authorization_code",
      "implicit",
      "refresh_token",
      "client_credentials",
      "password",
      "urn:ietf:params:oauth:grant-type:device_code",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    ])
  ),

  id_token_signing_alg_values_supported: z.array(
    z.enum(["RS256", "RS512", "HS256", "ES256", "PS256"])
  ),

  subject_types_supported: z.array(z.enum(["public", "pairwise", "ephemeral"])),

  token_endpoint_auth_methods_supported: z
    .array(
      z.enum([
        "client_secret_post",
        "client_secret_basic",
        "private_key_jwt",
        "tls_client_auth",
        "self_signed_tls_client_auth",
        "none",
      ])
    )
    .optional(),

  acr_values_supported: z.array(z.string()).optional(),

  scopes_supported: z
    .array(
      z.enum([
        "openid",
        "email",
        "profile",
        "address",
        "phone",
        "offline_access",
      ])
    )
    .optional(),

  request_parameter_supported: z.boolean().optional(),

  claims_supported: z
    .array(
      z.enum([
        "sub",
        "iss",
        "aud",
        "exp",
        "iat",
        "auth_time",
        "nonce",
        "acr",
        "amr",
        "azp",
        "email",
        "email_verified",
        "name",
        "given_name",
        "family_name",
        "preferred_username",
        "nickname",
        "groups",
        "picture",
      ])
    )
    .optional(),

  claims_parameter_supported: z.boolean().optional(),

  code_challenge_methods_supported: z
    .array(z.enum(["plain", "S256"]))
    .optional(),
});

export type OpenIdConfig = z.infer<typeof OPEN_ID_CONFIG_SCHEMA>;
