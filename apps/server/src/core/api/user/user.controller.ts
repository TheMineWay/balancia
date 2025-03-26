import { AuthService } from "@core/api/auth/auth.service";
import { TotpService } from "@core/api/auth/totp.service";
import { UserService } from "@core/api/user/user.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { User, UserTokenData } from "@core/decorators/user/user.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Controller } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import { UserModel, UserModelId } from "@shared/models";

const CONTROLLER = CONTROLLERS.user;

@Controller(getController(CONTROLLER))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly totpService: TotpService,
  ) {}

  @Endpoint(CONTROLLER, "get")
  get(
    @UserId() userId: UserModel["id"],
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "get">> {
    return this.userService.getById(userId);
  }

  @Endpoint(CONTROLLER, "update")
  update(
    @ValidatedBody(CONTROLLER, "update")
    userData: InferEndpointDTO<typeof CONTROLLER, "update">,
    @UserId() userId: UserTokenData["id"],
  ) {
    return this.userService.updateById(userId, userData);
  }

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
    await this.userService.updateUserPassword(user.id, password);
  }

  /* TOTP config */
  @Endpoint(CONTROLLER, "getEnable2FaInfo")
  getEnable2FaInfo(
    @UserId() userId: UserModelId,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "getEnable2FaInfo">> {
    return this.totpService.getCurrentUserTotpEnable(userId);
  }

  @Endpoint(CONTROLLER, "validate2fa")
  validateTotp(
    @UserId() userId: UserModelId,
    @ValidatedBody(CONTROLLER, "validate2fa")
    body: InferEndpointDTO<typeof CONTROLLER, "validate2fa">,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "validate2fa">> {
    return this.totpService.validateCurrentUserTotpEnable(userId, body.code);
  }
}
