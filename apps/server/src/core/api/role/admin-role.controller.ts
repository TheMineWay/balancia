import { RoleService } from "@core/api/role/role.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Permissions } from "@core/guards/permissions/permission.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import { Permission } from "@shared/models";

const CONTROLLER = CONTROLLERS.adminRole;

@Permissions(Permission.ROLE_ADMIN)
@Controller(getController(CONTROLLER))
export class AdminRoleController {
  constructor(private readonly roleService: RoleService) {}

  @Endpoint(CONTROLLER, "get")
  getRoles(): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "get">> {
    return this.roleService.getAll();
  }

  @Endpoint(CONTROLLER, "create")
  async create(
    @ValidatedBody(CONTROLLER, "create")
    body: InferEndpointDTO<typeof CONTROLLER, "create">,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "create">> {
    await this.roleService.create(body);
  }

  @Endpoint(CONTROLLER, "update")
  async update(
    @ValidatedBody(CONTROLLER, "update")
    body: InferEndpointDTO<typeof CONTROLLER, "update">,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "update">> {
    await this.roleService.update(id, body);
  }

  @Endpoint(CONTROLLER, "delete")
  async delete(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "delete">> {
    await this.roleService.delete(id);
  }
}
