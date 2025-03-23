import { UserService } from "@core/api/user/user.service";
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import type {
  DbUserModel,
  UserModelId,
  UserProfileInfoModel,
} from "@shared/models";
import { evaluatePassword } from "@shared/utils";

@Injectable()
export class UserProfileService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  getProfileById = async (userId: UserModelId) =>
    UserProfileService.getProfileFromDbUser(
      await this.userService.getById(userId),
    );

  getUserInfo = async (userId: UserModelId): Promise<UserProfileInfoModel> => {
    const user = await this.userService.getById(userId);

    return {
      user,
      configs: {
        totpEnabled: !!user.totpSecret,
      },
    };
  };

  updateUserPassword = async (userId: DbUserModel["id"], password: string) => {
    if (evaluatePassword(password).score < 60) throw new BadRequestException();
    await this.userService.updateById(userId, { password });
  };

  // Utils

  static readonly getProfileFromDbUser = (user: DbUserModel) => {
    const { password: _, totpSecret: __, ...profile } = user;
    return profile;
  };
}
