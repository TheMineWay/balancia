import { UserService } from "@core/api/user/user.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { UserId } from "@core/decorators/user/user-id.decorator";
import { Controller, NotFoundException } from "@nestjs/common";
import {
  getController,
  InferResponseDto,
  USER_CONTROLLER,
} from "@shared/api-definition";
import { type UserModel } from "@shared/models";

const CONTROLLER = USER_CONTROLLER;

@Controller(getController(CONTROLLER, {}))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Endpoint(CONTROLLER, "get")
  async get(
    @UserId() userId: UserModel["id"],
  ): Promise<InferResponseDto<typeof CONTROLLER, "get">> {
    const userData = await this.userService.getById(userId);

    if (!userData) throw new NotFoundException();
    return userData;
  }
}
