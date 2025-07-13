import { RoleService } from "@core/api/role/role.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Permissions } from "@core/guards/permissions/permission.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointDTO,
} from "@shared/api-definition";
import { Permission } from "@shared/models";

const CONTROLLER = CONTROLLERS.adminRole;

@Permissions(Permission.ROLE_ADMIN)
@Controller(getController(CONTROLLER))
export class AdminRoleController {
  constructor(private readonly roleService: RoleService) {}

  @Endpoint(CONTROLLER, "create")
  create(
    @ValidatedBody(CONTROLLER, "create")
    body: InferEndpointDTO<typeof CONTROLLER, "create">,
  ) {
    return this.roleService.create(body);
  }

  @Endpoint(CONTROLLER, "update")
  update(
    @ValidatedBody(CONTROLLER, "update")
    body: InferEndpointDTO<typeof CONTROLLER, "update">,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.roleService.update(id, body);
  }

  @Endpoint(CONTROLLER, "delete")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
