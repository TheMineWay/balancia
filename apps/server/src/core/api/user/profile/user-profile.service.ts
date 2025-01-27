import { UserRepository } from "@database/repository/core/user.repository";
import { BadRequestException } from "@nestjs/common";
import { DbUserModel } from "@shared/models";
import { evaluatePassword } from "@shared/utils";

export class UserProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  updateById = this.userRepository.updateById;

  updateUserPassword = async (userId: DbUserModel["id"], password: string) => {
    if (evaluatePassword(password).score < 60) throw new BadRequestException();
    await this.updateById(userId, { password });
  };
}
