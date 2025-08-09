import { AuthDirectoryService } from "@external/auth-directory/auth-directory.service";
import { Cacheable } from "cacheable";
import { vi } from "vitest";

export const AUTH_DIRECTORY_SERVICE_MOCK: AuthDirectoryService = {
	userIntegrationFailures: vi.mockObject(new Cacheable()),
	getUsers: vi.fn(),
	getUserByUsername: vi.fn(),
};
