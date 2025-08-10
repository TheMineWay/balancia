import { AuthService } from "@core/auth/auth/auth.service";
import { AUTH_REPOSITORY_MOCK } from "@core/auth/auth/repositories/auth.repository.mock";
import { USER_SERVICE_MOCK } from "@core/auth/user/user.service.mock";
import { USER_AUTH_INFO_CACHE_SERVICE_MOCK } from "@core/cache/caches/user-auth-info-cache.service.mock";
import { AUTH_DIRECTORY_SERVICE_MOCK } from "@external/auth-directory/auth-directory.service.mock";

export const AUTH_SERVICE_MOCK: AuthService = new AuthService(
	USER_SERVICE_MOCK,
	AUTH_REPOSITORY_MOCK,
	USER_AUTH_INFO_CACHE_SERVICE_MOCK,
	AUTH_DIRECTORY_SERVICE_MOCK,
);
