import { RoleRepository } from "@database/repository/core/role/role.repository";
import type {
  RoleSelect,
  RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import type {
  PaginatedQuery,
  PaginatedResponse,
  RoleEditablePropsModel,
  RoleModel,
  SearchModel,
  UserModel,
} from "@shared/models";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAll() {
    return this.roleRepository.findAll();
  }

  /* Admin */
  async create(role: RoleEditablePropsModel) {
    return this.roleRepository.create(role);
  }

  async update(id: RoleSelect["id"], role: RoleUpdate) {
    return this.roleRepository.update(id, role);
  }

  async delete(id: RoleSelect["id"]) {
    return this.roleRepository.delete(id);
  }

  async getRolesWithPermissions() {
    return await this.roleRepository.findWithStatistics();
  }

  // MARK: Role users

  assignRole(roleId: RoleModel["id"], userId: UserModel["id"]) {
    return this.roleRepository.assignRole(roleId, userId);
  }

  unassignRole(roleId: RoleModel["id"], userId: UserModel["id"]) {
    return this.roleRepository.unassignRole(roleId, userId);
  }

  getRoleUsersList(
    roleId: number,
    pagination: PaginatedQuery,
    search: SearchModel,
  ): Promise<PaginatedResponse<UserModel>> {
    return this.roleRepository.findRoleUsersList(roleId, pagination, search);
  }
}
