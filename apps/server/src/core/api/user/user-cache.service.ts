import { CacheService } from "@core/cache/cache.abstract";
import { CACHE_PROVIDERS } from "@core/cache/caches.module";
import { Inject, Injectable } from "@nestjs/common";
import { UserModel } from "@shared/models";
import { Cacheable } from "cacheable";

@Injectable()
export class UserCacheService extends CacheService {
  constructor(@Inject(CACHE_PROVIDERS.USER) userCache: Cacheable) {
    super(userCache);
  }

  async getById(
    userId: UserModel["id"],
    fetchUserById: (id: UserModel["id"]) => Promise<UserModel | null>,
  ) {
    return await this.get<UserModel>(
      `id:${userId}`,
      async () => await fetchUserById(userId),
    );
  }

  async getByCode(
    code: UserModel["code"],
    fetchUserByCode: (id: UserModel["code"]) => Promise<UserModel | null>,
  ) {
    return await this.get<UserModel>(
      `code:${code}`,
      async () => await fetchUserByCode(code),
    );
  }
}
