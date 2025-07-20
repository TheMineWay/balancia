import { RoleRepository } from "@database/repository/core/role/role.repository";
import {
  RoleSelect,
  RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import { RoleCreateModel } from "@shared/models";
import * as _ from "lodash";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAll() {
    return this.roleRepository.findAll();
  }

  /* Admin */
  async create(role: RoleCreateModel) {
    return this.roleRepository.create(role);
  }

  async update(id: RoleSelect["id"], role: RoleUpdate) {
    return this.roleRepository.update(id, role);
  }

  async delete(id: RoleSelect["id"]) {
    return this.roleRepository.delete(id);
  }

  async getRolesWithPermissions() {
    const rawData = await this.roleRepository.findAllWithPermissions();
    const grouped = _.groupBy(rawData, (d) => d.id);
    return _.map(grouped, (groupedItems) => {
      const { id, name, createdAt, updatedAt } = groupedItems[0];
      const permissions = _(groupedItems)
        .map("permission")
        .compact()
        .uniqBy("id")
        .value();

      return {
        id,
        name,
        createdAt,
        updatedAt,
        permissions,
      };
    });
  }
}
