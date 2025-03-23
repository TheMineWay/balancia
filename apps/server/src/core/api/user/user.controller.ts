import { UserService } from "@core/api/user/user.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { UserTokenData } from "@core/decorators/user/user.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Controller } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import { UserModel } from "@shared/models";

const CONTROLLER = CONTROLLERS.user;

@Controller(getController(CONTROLLER))
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
