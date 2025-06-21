import { QueryOptions } from "@database/repository/core/repository";
import { UserUpdate } from "@database/schemas/main/tables/users.table";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";
import { DbUserModel } from "@shared/models";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByCode(code: string) {
    return await this.userRepository.findByCode(code);
  }

  getById = async (userId: DbUserModel["id"]) => {
    return await this.userRepository.findById(userId);
  };

  updateById = (
    userId: DbUserModel["id"],
    userData: UserUpdate,
    options?: QueryOptions,
  ) => this.userRepository.updateById(userId, userData, options);
}
