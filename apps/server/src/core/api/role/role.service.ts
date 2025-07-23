import { RoleRepository } from "@database/repository/core/role/role.repository";
import type {
  RoleSelect,
  RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import type { RoleEditablePropsModel } from "@shared/models";

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
}
