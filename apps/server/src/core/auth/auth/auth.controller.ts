import { AuthService } from "@core/auth/auth/auth.service";
import { User } from "@core/auth/auth/decorators/user/user.decorator";
import { Controller } from "@nestjs/common";
import {
	AUTH_CONTROLLER,
	getController,
	type InferResponseDto,
} from "@shared/api-definition";
import type { UserModel } from "@shared/models";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";

const CONTROLLER = AUTH_CONTROLLER;

@Controller(getController(CONTROLLER, {}))
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	
	@Endpoint(CONTROLLER, "my-info")
	async myInfo(
		@User() user: UserModel,
	): Promise<InferResponseDto<typeof CONTROLLER, "my-info">> {
		return await this.authService.getUserInfo(user.id);
	}
}
