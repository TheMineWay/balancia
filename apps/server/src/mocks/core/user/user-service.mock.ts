import { UserService } from "@core/user/user.service";
import { USERS_MOCK } from "@mocks/core/user/users.mock";

export const USER_SERVICE_MOCK: UserService = Object.assign({
  findByUsername: async (username: string) => {
    return USERS_MOCK[username] ?? null;
  },
});
