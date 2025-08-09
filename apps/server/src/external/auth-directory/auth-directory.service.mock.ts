import { AuthDirectoryService } from "@external/auth-directory/auth-directory.service";
import { vi } from "vitest";

export const AUTH_DIRECTORY_SERVICE_MOCK: AuthDirectoryService = {
	getUsers: vi.fn(),
	getUserByCode: vi.fn(),
};
