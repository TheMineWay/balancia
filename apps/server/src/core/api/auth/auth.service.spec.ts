import type { AuthService } from "@core/api/auth/auth.service";
import { AUTH_SERVICE_MOCK } from "@core/mocks/auth/auth.service.mock";
import { beforeEach, describe } from "vitest";

describe.skip("Auth service", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = AUTH_SERVICE_MOCK;
  });
});
