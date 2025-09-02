import { UserId } from "@core/auth/auth/decorators/user/user-id.decorator";
import { Controller } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	getController,
	InferResponseDto,
	USER_PREFERENCES_CONTROLLER,
} from "@shared/api-definition";
import { UserModelId } from "@shared/models";
import { UserPreferencesService } from "src/common/user/preferences/user-preferences.service";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";

@Controller(getController(USER_PREFERENCES_CONTROLLER, {}))
export class UserPreferencesController {
	constructor(
		private readonly userPreferencesService: UserPreferencesService,
	) {}

	@ApiOperation({ summary: "Get preferences for the current user" })
	@Endpoint(USER_PREFERENCES_CONTROLLER, "getMyPreferences")
	async getMyPreferences(
		@UserId() userId: UserModelId,
	): Promise<
		InferResponseDto<typeof USER_PREFERENCES_CONTROLLER, "getMyPreferences">
	> {
		return {
			preferences: await this.userPreferencesService.getByUserId(userId),
		};
	}
}
