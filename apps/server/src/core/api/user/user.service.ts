import { UserCacheService } from "@core/cache/caches/user-cache.service";
import { QueryOptions } from "@database/repository/core/repository";
import {
  UserInsert,
  UserUpdate,
} from "@database/schemas/main/tables/identity/user.table";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";
import { DbUserModel, PaginatedQuery, SearchModel } from "@shared/models";

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

  getList = async (pagination: PaginatedQuery, search: SearchModel) => {
    return this.userRepository.findAndCount(pagination, search);
  };

  updateById = (
    userId: DbUserModel["id"],
    userData: UserUpdate,
    options?: QueryOptions,
  ) => this.userRepository.updateById(userId, userData, options);

  findOrCreateByCode = async (code: string, data: Omit<UserInsert, "code">) => {
    const user = await this.getByCode(code);
    if (user) return user;
    return await this.userRepository.create({ code, ...data });
  };

  syncUsers = async (usersData: UserInsert[], options?: QueryOptions) => {
    const users = await this.userRepository.findByCodes(
      usersData.map((u) => u.code),
      options,
    );

    for (const user of users) {
      const data = usersData.find((u) => u.code === user.code);

      // If there is no user, do not integrate
      if (!data) continue;

      // If the data is the same, do not update
      if (
        data.name === user.name &&
        data.username === user.username &&
        data.email === user.email
      )
        continue;

      await this.updateById(user.id, data, options);
    }
  };
}
