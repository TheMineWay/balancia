import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { UserService } from "@core/auth/user/user.service";
import { Controller, NotFoundException } from "@nestjs/common";
import {
	getController,
	type InferResponseDto,
	USER_CONTROLLER,
} from "@shared/api-definition";
import type { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";

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
