import { QueryOptions } from "@database/repository/core/repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";
import { DbUserModel } from "@shared/models";
import { evaluatePassword } from "@shared/utils";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  getById = async (userId: DbUserModel["id"]) => {
    return await this.userRepository.findById(userId);
  };

  updateById = (
    userId: DbUserModel["id"],
    userData: Partial<DbUserModel>,
    options?: QueryOptions,
  ) => this.userRepository.updateById(userId, userData, options);

  updateUserPassword = async (userId: DbUserModel["id"], password: string) => {
    if (evaluatePassword(password).score < 60) throw new BadRequestException();
    await this.updateById(userId, { password });
  };
}
