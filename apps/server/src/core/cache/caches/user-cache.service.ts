import { ENV } from "@constants/conf/env.constant";
import { CacheService } from "@core/cache/cache.abstract";
import { Injectable } from "@nestjs/common";
import { UserModel } from "@shared/models";
import { Cacheable } from "cacheable";

@Injectable()
export class UserCacheService extends CacheService {
  constructor() {
    super(new Cacheable({ ttl: ENV.cache.user }));
  }

  async getById(
    userId: UserModel["id"],
    fetchUserById: (id: UserModel["id"]) => Promise<UserCacheData | null>,
  ) {
    return await this.get<UserCacheData>(
      `id:${userId}`,
      async () => await fetchUserById(userId),
    );
  }

  async getByCode(
    code: UserModel["code"],
    fetchUserByCode: (id: UserModel["code"]) => Promise<UserCacheData | null>,
  ) {
    return await this.get<UserCacheData>(
      `code:${code}`,
      async () => await fetchUserByCode(code),
    );
  }
}

export type UserCacheData = UserModel;
