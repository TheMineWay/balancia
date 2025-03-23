import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { QueryOptions } from "@database/repository/core/repository";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";
import { DbUserModel } from "@shared/models";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  getById = async (userId: DbUserModel["id"]) => {
    const user = await this.userRepository.findById(userId);
    return UserProfileService.getProfileFromDbUser(user);
  };

  updateById = (
    userId: DbUserModel["id"],
    userData: Partial<DbUserModel>,
    options?: QueryOptions,
  ) => this.userRepository.updateById(userId, userData, options);
}
