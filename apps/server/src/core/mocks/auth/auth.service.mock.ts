import { AuthService } from "@core/api/auth/auth.service";
import { USER_AUTH_INFO_CACHE_SERVICE_MOCK } from "@core/mocks/cache/auth/user-auth-info-cache.service.mock";
import { AUTH_REPOSITORY_MOCK } from "@core/mocks/database/repository/auth/auth.repository.mock";
import { USER_SERVICE_MOCK } from "@core/mocks/user/user.service.mock";

export const AUTH_SERVICE_MOCK: AuthService = new AuthService(
	USER_SERVICE_MOCK,
	AUTH_REPOSITORY_MOCK,
	USER_AUTH_INFO_CACHE_SERVICE_MOCK,
);
