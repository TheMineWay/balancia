import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
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
  Permission,
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
    private readonly userAuthInfoCacheService: UserAuthInfoCacheService,
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
    await this.databaseService.db.transaction(async (transaction) => {
      const userRole = await this.roleRepository.findByUserAndRole(
        userId,
        roleId,
        { transaction },
      );
      if (userRole) return;

      return this.roleRepository.assignRole(roleId, userId, { transaction });
    });

    this.userAuthInfoCacheService.clearAll();
  }

  async unassignRole(roleId: RoleModel["id"], userId: UserModel["id"]) {
    await this.roleRepository.unassignRole(roleId, userId);
    this.userAuthInfoCacheService.clearAll();
  }

  getRoleUsersList(
    roleId: number,
    pagination: PaginatedQuery,
    search: SearchModel,
  ): Promise<PaginatedResponse<UserModel>> {
    return this.roleRepository.findRoleUsersList(roleId, pagination, search);
  }

  async setRolePermissions(
    roleId: RoleModel["id"],
    permissions: Permission[],
  ): Promise<void> {
    await this.databaseService.db.transaction(async (transaction) => {
      // Fetch BD permissions
      const dbPermissions = await this.roleRepository.findPermissions({
        transaction,
      });

      // Fetch assigned permissions
      const assignedRolePermissions =
        await this.roleRepository.findRolePermissions(roleId, { transaction });

      if (assignedRolePermissions.length > 0) {
        // Identify assigned permissions that are not present in the new permissions
        const toRemove = assignedRolePermissions.filter(
          (p) => !permissions.includes(p.code),
        );

        // Remove them
        await this.roleRepository.deleteRolePermissions(
          roleId,
          toRemove.map((p) => p.id),
          { transaction },
        );
      }

      // Identify permissions to add
      const toAdd = dbPermissions.filter(
        (p) =>
          permissions.includes(p.code) &&
          !assignedRolePermissions.find((rp) => rp.code === p.code),
      );

      // Add new permissions
      await this.roleRepository.addRolePermissions(
        roleId,
        toAdd.map((p) => p?.id),
        {
          transaction,
        },
      );
    });

    this.userAuthInfoCacheService.clearAll();
  }
}
