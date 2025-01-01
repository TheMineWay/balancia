import { UserService } from "@core/api/user/user.service";
import { USERS_MOCK } from "@core/mocks/user/users.mock";

export const USER_SERVICE_MOCK: UserService = Object.assign({
  findByUsername: async (username: string) => {
    return USERS_MOCK[username] ?? null;
  },
});
