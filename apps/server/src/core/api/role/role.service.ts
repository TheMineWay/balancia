import { DATABASE_PROVIDERS } from "@database/database.provider";
import { RoleRepository } from "@database/repository/core/role/role.repository";
import type {
  RoleSelect,
  RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { DatabaseService } from "@database/services/database.service";
import { Inject, Injectable } from "@nestjs/common";
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
  constructor(
    private readonly roleRepository: RoleRepository,
    @Inject(DATABASE_PROVIDERS.main)
    private readonly databaseService: DatabaseService,
  ) {}

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

  async assignRole(roleId: RoleModel["id"], userId: UserModel["id"]) {
    return await this.databaseService.db.transaction(async (transaction) => {
      const userRole = await this.roleRepository.findByUserAndRole(
        userId,
        roleId,
        { transaction },
      );
      if (userRole) return;

      return this.roleRepository.assignRole(roleId, userId, { transaction });
    });
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
