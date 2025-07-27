import { RoleService } from "@core/api/role/role.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "@core/decorators/validation/validated-query.decorator";
import { Permissions } from "@core/guards/permissions/permission.decorator";
import { Controller, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ADMIN_ROLE_CONTROLLER,
  getController,
  getParamName,
  type InferBodyDto,
  type InferResponseDto,
} from "@shared/api-definition";
import { type PaginatedQuery, Permission } from "@shared/models";

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
    @Param("roleId", ParseIntPipe) id: number,
  ): Promise<InferResponseDto<typeof CONTROLLER, "update">> {
    await this.roleService.update(id, body);
  }

  @ApiOperation({ summary: "Delete a role" })
  @Endpoint(CONTROLLER, "delete")
  async delete(
    @Param(getParamName(CONTROLLER, "delete", "roleId"), ParseIntPipe)
    id: number,
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

  @ApiOperation({ summary: "Get users assigned to a role" })
  @Endpoint(CONTROLLER, "role-users")
  async getRoleUsers(
    @Param(getParamName(CONTROLLER, "role-users", "roleId"), ParseIntPipe)
    roleId: number,
    @ValidatedQuery(CONTROLLER, "role-users") pagination: PaginatedQuery,
  ): Promise<InferResponseDto<typeof CONTROLLER, "role-users">> {
    return await this.roleService.getRoleUsersList(roleId, pagination);
  }
}
