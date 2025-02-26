import { MyUserProfileService } from "@core/api/user/profile/my-user-profile.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Body, Controller } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class MyUserProfileController {
  constructor(private readonly myUserProfileService: MyUserProfileService) {}

  @Endpoint(CONTROLLER, "get")
  get(
    @UserId() userId: UserModel["id"],
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "get">> {
    return this.myUserProfileService.getById(userId);
  }

  @Endpoint(CONTROLLER, "update")
  update(
    @ValidatedBody(CONTROLLER, "update")
    userData: InferEndpointDTO<typeof CONTROLLER, "update">,
    @UserId() userId: UserModel["id"],
  ) {
    return this.myUserProfileService.updateById(userId, userData);
  }

  // Details

  @Endpoint(CONTROLLER, "updatePassword")
  updatePassword(
    @Body() { password }: { password: string }, // TODO: validate
    @UserId() userId: UserModel["id"],
  ) {
    return this.myUserProfileService.updateUserPassword(userId, password);
  }
}
