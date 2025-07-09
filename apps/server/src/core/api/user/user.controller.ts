import { UserService } from "@core/api/user/user.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { User } from "@core/decorators/user/user.decorator";
import { Controller, NotFoundException } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import type { UserModel } from "@shared/models";

const CONTROLLER = CONTROLLERS.user;

@Controller(getController(CONTROLLER))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Endpoint(CONTROLLER, "get")
  async get(
    @User() user: UserModel,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "get">> {
    const userData = await this.userService.getById(user.id);

    if (!userData) throw new NotFoundException();
    return userData;
  }
}
