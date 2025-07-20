import { RoleService } from "@core/api/role/role.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Permissions } from "@core/guards/permissions/permission.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ADMIN_ROLE_CONTROLLER,
  getController,
  InferBodyDto,
  InferResponseDto,
} from "@shared/api-definition";
import { Permission } from "@shared/models";

const CONTROLLER = ADMIN_ROLE_CONTROLLER;

@ApiTags("Role administration")
@Permissions(Permission.ROLE_ADMIN)
@Controller(getController(CONTROLLER, {}))
export class AdminRoleController {
  constructor(private readonly roleService: RoleService) {}

  // CRUD

  @ApiOperation({ summary: "Get all roles" })
  @Endpoint(CONTROLLER, "get")
  async getRoles(): Promise<InferResponseDto<typeof CONTROLLER, "get">> {
    return { roles: await this.roleService.getAll() };
  }

  @ApiOperation({ summary: "Create a new role" })
  @Endpoint(CONTROLLER, "create")
  async create(
    @ValidatedBody(CONTROLLER, "create")
    body: InferBodyDto<typeof CONTROLLER, "create">,
  ): Promise<InferResponseDto<typeof CONTROLLER, "create">> {
    await this.roleService.create(body);
  }

  @ApiOperation({ summary: "Update an existing role" })
  @Endpoint(CONTROLLER, "update")
  async update(
    @ValidatedBody(CONTROLLER, "update")
    body: InferBodyDto<typeof CONTROLLER, "update">,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<InferResponseDto<typeof CONTROLLER, "update">> {
    await this.roleService.update(id, body);
  }

  @ApiOperation({ summary: "Delete a role" })
  @Endpoint(CONTROLLER, "delete")
  async delete(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<InferResponseDto<typeof CONTROLLER, "delete">> {
    await this.roleService.delete(id);
  }

  // Extended
  @ApiOperation({ summary: "Get roles with statistics" })
  @Endpoint(CONTROLLER, "get-with-statistics")
  async getRolesWithPermissions(): Promise<
    InferResponseDto<typeof CONTROLLER, "get-with-statistics">
  > {
    return { roles: await this.roleService.getRolesWithPermissions() };
  }
}
