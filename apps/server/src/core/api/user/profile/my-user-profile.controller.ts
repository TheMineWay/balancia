import { MyUserProfileService } from "@core/api/user/profile/my-user-profile.service";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Body, Controller, Get, Patch, Put } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  getEndpoint,
  getEndpointDTO,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class MyUserProfileController {
  constructor(private readonly myUserProfileService: MyUserProfileService) {}

  @Get(getEndpoint(CONTROLLER, "get"))
  get(
    @UserId() userId: UserModel["id"],
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "get">> {
    return this.myUserProfileService.getById(userId);
  }

  @Put(getEndpoint(CONTROLLER, "update"))
  update(
    @ValidatedBody(getEndpointDTO(CONTROLLER, "update"))
    userData: InferEndpointDTO<typeof CONTROLLER, "update">,
    @UserId() userId: UserModel["id"],
  ) {
    return this.myUserProfileService.updateById(userId, userData);
  }

  // Details

  @Patch(getEndpoint(CONTROLLER, "updatePassword"))
  updatePassword(
    @Body() { password }: { password: string }, // TODO: validate
    @UserId() userId: UserModel["id"],
  ) {
    return this.myUserProfileService.updateUserPassword(userId, password);
  }
}
