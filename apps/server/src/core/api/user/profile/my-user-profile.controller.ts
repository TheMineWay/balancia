import { MyUserProfileService } from "@core/api/user/profile/my-user-profile.service";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { UserPasswordUpdateDTO } from "@dto/user/user-password-update.dto";
import { Body, Controller, Patch, Put } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  getEndpoint,
  getEndpointDTO,
  InferEndpointDTO,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class MyUserProfileController {
  constructor(private readonly myUserProfileService: MyUserProfileService) { }

  @Put(getEndpoint(CONTROLLER, "update"))
  update(
    @ValidatedBody(getEndpointDTO(CONTROLLER, 'update')) userData: InferEndpointDTO<typeof CONTROLLER, 'update'>,
    @UserId() userId: UserModel["id"]
  ) {
    return this.myUserProfileService.updateById(userId, userData);
  }

  // Details

  @Patch(getEndpoint(CONTROLLER, "updatePassword"))
  updatePassword(
    @Body() { password }: UserPasswordUpdateDTO,
    @UserId() userId: UserModel["id"]
  ) {
    return this.myUserProfileService.updateUserPassword(userId, password);
  }
}
