import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { UserPasswordUpdateDTO } from "@dto/user/user-password-update.dto";
import { UserProfileUpdateDTO } from "@dto/user/user-profile-update.dto";
import { Body, Controller, Patch, Put } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  getEndpoint,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Put(getEndpoint(CONTROLLER, "update"))
  update(
    @Body() userData: UserProfileUpdateDTO,
    @UserId() userId: UserModel["id"]
  ) {
    return this.userProfileService.updateById(userId, userData);
  }

  // Details

  @Patch(getEndpoint(CONTROLLER, "updatePassword"))
  updatePassword(
    @Body() { password }: UserPasswordUpdateDTO,
    @UserId() userId: UserModel["id"]
  ) {
    return this.userProfileService.updateUserPassword(userId, password);
  }
}
