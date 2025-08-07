import { UserService } from "@core/api/user/user.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { ValidatedQuery } from "@core/decorators/validation/validated-query.decorator";
import { Permissions } from "@core/guards/permissions/permission.decorator";
import { Controller } from "@nestjs/common";
import {
	ADMIN_USER_CONTROLLER,
	getController,
	type InferQueryDto,
	type InferResponseDto,
} from "@shared/api-definition";
import { Permission } from "@shared/models";

@Permissions(Permission.ADMIN)
@Controller(getController(ADMIN_USER_CONTROLLER, {}))
export class AdminUserController {
	constructor(private readonly userService: UserService) {}

	@Endpoint(ADMIN_USER_CONTROLLER, "list")
	getUsersList(
		@ValidatedQuery(ADMIN_USER_CONTROLLER, "list")
		{ search, pagination }: InferQueryDto<typeof ADMIN_USER_CONTROLLER, "list">,
	): Promise<InferResponseDto<typeof ADMIN_USER_CONTROLLER, "list">> {
		return this.userService.getList(pagination, search);
	}
}
