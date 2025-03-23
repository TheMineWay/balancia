import { UserService } from "@core/api/user/user.service";
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import type { DbUserModel } from "@shared/models";
import { evaluatePassword } from "@shared/utils";

@Injectable()
export class UserProfileService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

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
