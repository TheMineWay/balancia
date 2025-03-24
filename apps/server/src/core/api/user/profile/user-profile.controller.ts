import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { Controller } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import type { UserModelId } from "@shared/models";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  // Details

  @Endpoint(CONTROLLER, "getInfo")
  getInfo(
    @UserId() userId: UserModelId,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "getInfo">> {
    return this.userProfileService.getUserInfo(userId);
  }
}
