import type { UserService } from "@core/auth/user/user.service";
import { DB_USERS_MOCK } from "@shared/mocks";

export const USER_SERVICE_MOCK: UserService = Object.assign({
	getByUsername: async (username: string) => {
		if (username in DB_USERS_MOCK) {
			return DB_USERS_MOCK[username as keyof typeof DB_USERS_MOCK];
		}

		return null;
	},
});
