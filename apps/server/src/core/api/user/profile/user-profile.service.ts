import { Injectable } from "@nestjs/common";
import { DbUserModel } from "@shared/models";

@Injectable()
export class UserProfileService {
  /*constructor(private readonly userService: UserService) {}

  updateUserPassword = async (userId: DbUserModel["id"], password: string) => {
    if (evaluatePassword(password).score < 60) throw new BadRequestException();
    await this.userService.updateById(userId, { password });
  };*/

  updateUserPassword = async (
    userId: DbUserModel["id"],
    password: string,
  ) => {};

  // Utils

  static readonly getProfileFromDbUser = (user: DbUserModel) => {
    const { password: _, totpSecret: __, ...profile } = user;
    return profile;
  };
}
