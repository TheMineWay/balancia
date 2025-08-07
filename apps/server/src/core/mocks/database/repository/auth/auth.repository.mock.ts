import { DATABASE_SERVICE_MOCK } from "@core/mocks/database/database.service.mock";
import { AuthRepository } from "@database/repository/core/auth/auth.repository";

export const AUTH_REPOSITORY_MOCK = new AuthRepository(DATABASE_SERVICE_MOCK);
