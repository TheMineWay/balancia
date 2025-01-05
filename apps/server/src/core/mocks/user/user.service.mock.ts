import { UserService } from "@core/api/user/user.service";
import { DB_USERS_MOCK } from "@shared/mocks/dist";

export const USER_SERVICE_MOCK: UserService = Object.assign({
  findByUsername: async (username: string) => {
    return DB_USERS_MOCK[username] ?? null;
  },
});
