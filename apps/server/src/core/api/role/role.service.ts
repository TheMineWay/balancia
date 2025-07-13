import { RoleRepository } from "@database/repository/core/role/role.repository";
import {
  RoleSelect,
  RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import { RoleCreateModel } from "@shared/models";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  /* Admin */
  create(role: RoleCreateModel) {
    return this.roleRepository.create(role);
  }

  update(id: RoleSelect["id"], role: RoleUpdate) {
    return this.roleRepository.update(id, role);
  }

  delete(id: RoleSelect["id"]) {
    return this.roleRepository.delete(id);
  }
}
