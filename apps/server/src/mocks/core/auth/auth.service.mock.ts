import { AuthService } from "@core/auth/auth.service";
import { JWT_SERVICE_MOCK } from "@mocks/core/auth/jwt.service.mock";
import { USER_SERVICE_MOCK } from "@mocks/core/user/user.service.mock";

export const AUTH_SERVICE_MOCK: AuthService = new AuthService(
  USER_SERVICE_MOCK,
  JWT_SERVICE_MOCK
);
