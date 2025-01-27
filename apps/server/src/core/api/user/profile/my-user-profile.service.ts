import { QueryOptions } from "@database/repository/core/repository";
import { UserRepository } from "@database/repository/core/user.repository";
import { UserUpdate } from "@database/schemas/main/tables/users.table";
import { BadRequestException } from "@nestjs/common";
import { DbUserModel, UserModel } from "@shared/models";
import { evaluatePassword } from "@shared/utils";

export class MyUserProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  updateById = (
    userId: UserModel["id"],
    userData: UserUpdate,
    options?: QueryOptions
  ) => this.userRepository.updateById(userId, userData, options);

  updateUserPassword = async (userId: DbUserModel["id"], password: string) => {
    if (evaluatePassword(password).score < 60) throw new BadRequestException();
    await this.updateById(userId, { password });
  };
}
