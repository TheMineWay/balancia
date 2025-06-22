import { AuthService } from "@core/api/auth/auth.service";
import { USER_SERVICE_MOCK } from "@core/mocks/user/user.service.mock";

export const AUTH_SERVICE_MOCK: AuthService = new AuthService(
  USER_SERVICE_MOCK,
);
