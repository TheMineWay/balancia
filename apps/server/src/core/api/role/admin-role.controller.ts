import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { Permissions } from "@core/guards/permissions/permission.decorator";
import { Controller } from "@nestjs/common";
import { CONTROLLERS, getController } from "@shared/api-definition";
import { Permission } from "@shared/models";

const CONTROLLER = CONTROLLERS.adminRole;

@Permissions(Permission.ROLE_ADMIN)
@Controller(getController(CONTROLLER))
export class AdminRoleController {
  @Endpoint(CONTROLLER, "create")
  create() {}

  @Endpoint(CONTROLLER, "update")
  update() {}

  @Endpoint(CONTROLLER, "delete")
  delete() {}
}
