import { AuthRepository } from "@core/auth/auth/repositories/auth.repository";
import { DATABASE_SERVICE_MOCK } from "@database/services/database.service.mock";

export const AUTH_REPOSITORY_MOCK = new AuthRepository(DATABASE_SERVICE_MOCK);
