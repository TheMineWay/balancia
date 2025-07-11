import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { QueryOptions } from "@database/repository/core/repository";
import { UserUpdate } from "@database/schemas/main/tables/identity/user.table";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";
import { DbUserModel } from "@shared/models";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userCacheService: UserCacheService,
  ) {}

  async getByCode(code: string) {
    return this.userCacheService.getByCode(
      code,
      this.userRepository.findByCode,
    );
  }

  getById = async (userId: DbUserModel["id"]) => {
    return this.userCacheService.getById(userId, this.userRepository.findById);
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
