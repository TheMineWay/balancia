import { AuthService } from "@core/api/auth/auth.service";
import { JWT_SERVICE_MOCK } from "@core/mocks/auth/jwt.service.mock";
import { USER_SERVICE_MOCK } from "@core/mocks/user/user.service.mock";

export const AUTH_SERVICE_MOCK: AuthService = new AuthService(
  USER_SERVICE_MOCK,
  JWT_SERVICE_MOCK
);
