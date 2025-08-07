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
	type InferQueryDto,
	type InferResponseDto,
} from "@shared/api-definition";
import { Permission } from "@shared/models";

const CONTROLLER = ADMIN_ROLE_CONTROLLER;

@ApiTags("Role administration")
@Permissions(Permission.ADMIN)
@Controller(getController(CONTROLLER, {}))
export class AdminRoleController {
	constructor(private readonly roleService: RoleService) {}

	// MARK: CRUD

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

	// MARK: List
	@ApiOperation({ summary: "Get roles with statistics" })
	@Endpoint(CONTROLLER, "get-with-statistics")
	async getRolesWithPermissions(): Promise<
		InferResponseDto<typeof CONTROLLER, "get-with-statistics">
	> {
		return { roles: await this.roleService.getRolesWithPermissions() };
	}

	// MARK: Role users

	@ApiOperation({ summary: "Assign a user to a role" })
	@Endpoint(CONTROLLER, "assign-role")
	async assignRole(
		@Param(getParamName(CONTROLLER, "assign-role", "roleId"), ParseIntPipe)
		roleId: number,
		@Param(getParamName(CONTROLLER, "assign-role", "userId"), ParseIntPipe)
		userId: number,
	): Promise<InferResponseDto<typeof CONTROLLER, "assign-role">> {
		await this.roleService.assignRole(roleId, userId);
	}

	@ApiOperation({ summary: "Unassign a user from a role" })
	@Endpoint(CONTROLLER, "unassign-role")
	async unassignRole(
		@Param(getParamName(CONTROLLER, "unassign-role", "roleId"), ParseIntPipe)
		roleId: number,
		@Param(getParamName(CONTROLLER, "unassign-role", "userId"), ParseIntPipe)
		userId: number,
	): Promise<InferResponseDto<typeof CONTROLLER, "unassign-role">> {
		await this.roleService.unassignRole(roleId, userId);
	}

	@ApiOperation({ summary: "Get users assigned to a role" })
	@Endpoint(CONTROLLER, "role-users")
	async getRoleUsers(
		@Param(getParamName(CONTROLLER, "role-users", "roleId"), ParseIntPipe)
		roleId: number,
		@ValidatedQuery(CONTROLLER, "role-users")
		{ pagination, search }: InferQueryDto<typeof CONTROLLER, "role-users">,
	): Promise<InferResponseDto<typeof CONTROLLER, "role-users">> {
		return await this.roleService.getRoleUsersList(roleId, pagination, search);
	}

	// MARK: Role permissions
	@ApiOperation({ summary: "Set role permissions" })
	@Endpoint(CONTROLLER, "set-role-permissions")
	async setPermissions(
		@Param(
			getParamName(CONTROLLER, "set-role-permissions", "roleId"),
			ParseIntPipe,
		)
		roleId: number,
		@ValidatedBody(CONTROLLER, "set-role-permissions")
		body: InferBodyDto<typeof CONTROLLER, "set-role-permissions">,
	): Promise<InferResponseDto<typeof CONTROLLER, "set-role-permissions">> {
		await this.roleService.setRolePermissions(roleId, body.permissions);
	}

	@ApiOperation({ summary: "Get role permissions" })
	@Endpoint(CONTROLLER, "get-role-permissions")
	async getRolePermissions(
		@Param(
			getParamName(CONTROLLER, "get-role-permissions", "roleId"),
			ParseIntPipe,
		)
		roleId: number,
	): Promise<InferResponseDto<typeof CONTROLLER, "get-role-permissions">> {
		return {
			permissions: (await this.roleService.getRolePermissions(roleId)).map(
				(r) => r.code,
			),
		};
	}
}
