import type { OidcService } from "@core/api/auth/open-id-connect/oidc.service";

export const OIDC_SERVICE_MOCK: OidcService = Object.assign({
  getTokenFromCode: async (_: string) => {
    return "TEST_JWT_TOKEN";
  },
});
