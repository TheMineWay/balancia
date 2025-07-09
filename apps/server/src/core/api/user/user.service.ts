import { CACHE_PROVIDERS } from "@core/cache/caches.module";
import { QueryOptions } from "@database/repository/core/repository";
import { UserUpdate } from "@database/schemas/main/tables/users.table";
import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";
import { DbUserModel } from "@shared/models";
import type { Cacheable } from "cacheable";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(CACHE_PROVIDERS.USER) private readonly userCache: Cacheable,
  ) {}

  async getByCode(code: string) {
    return await this.userRepository.findByCode(code);
  }

  getById = async (userId: DbUserModel["id"]) => {
    // Look for user in cache
    const cachedUser = await this.userCache.get<DbUserModel>(userId.toString());
    if (cachedUser) return cachedUser;

    // If not found in cache, fetch from database
    const user = await this.userRepository.findById(userId);
    if (!user) return null;

    // Store user in cache
    await this.userCache.set(userId.toString(), user);
    return user;
  };

  updateById = (
    userId: DbUserModel["id"],
    userData: UserUpdate,
    options?: QueryOptions,
  ) => this.userRepository.updateById(userId, userData, options);

  findOrCreateByCode = async (code: string) => {
    const user = await this.getByCode(code);
    if (user) return user;

    return await this.userRepository.create({ code });
  };
}
