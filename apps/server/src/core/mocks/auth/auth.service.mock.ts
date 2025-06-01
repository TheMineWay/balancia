import { AuthService } from "@core/api/auth/auth.service";
import { OIDC_SERVICE_MOCK } from "@core/mocks/user/oidc.service.mock";
import { USER_SERVICE_MOCK } from "@core/mocks/user/user.service.mock";

export const AUTH_SERVICE_MOCK: AuthService = new AuthService(
  USER_SERVICE_MOCK,
  OIDC_SERVICE_MOCK,
);
