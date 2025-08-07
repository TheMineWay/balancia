import type { UserService } from "@core/api/user/user.service";
import { DB_USERS_MOCK } from "@shared/mocks";

export const USER_SERVICE_MOCK: UserService = Object.assign({
	getByUsername: async (username: string) => {
		return DB_USERS_MOCK[username] ?? null;
	},
});
