import { AuthService } from "@core/api/auth/auth.service";
import { UserProfileService } from "@core/api/user/profile/user-profile.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { User, UserTokenData } from "@core/decorators/user/user.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Controller } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class UserProfileController {
  constructor(
    private readonly authService: AuthService,
    private readonly userProfileService: UserProfileService,
  ) {}

  // Details

  @Endpoint(CONTROLLER, "updatePassword")
  async updatePassword(
    @ValidatedBody(CONTROLLER, "updatePassword")
    {
      currentPassword,
      password,
    }: InferEndpointDTO<typeof CONTROLLER, "updatePassword">,
    @User() user: UserTokenData,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "updatePassword">> {
    // Check if user provided its own correct password
    await this.authService.fetchAndValidateCredentials({
      password: currentPassword,
      username: user.username,
    });

    // Update password
    await this.userProfileService.updateUserPassword(user.id, password);
  }
}
