import { QueryOptions, Repository } from "@database/repository/core/repository";
import {
  permissionTable,
  rolePermissionTable,
} from "@database/schemas/main.schema";
import {
  RoleInsert,
  roleTable,
  RoleUpdate,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

@Injectable()
export class RoleRepository extends Repository {
  async findAll(options?: QueryOptions) {
    return await this.query(options).select().from(roleTable);
  }

  async findAllWithPermissions(options?: QueryOptions) {
    return await this.query(options)
      .select({
        id: roleTable.id,
        name: roleTable.name,
        createdAt: roleTable.createdAt,
        updatedAt: roleTable.updatedAt,
        permission: permissionTable.code,
      })
      .from(roleTable)
      .leftJoin(
        rolePermissionTable,
        eq(roleTable.id, rolePermissionTable.roleId),
      )
      .leftJoin(
        permissionTable,
        eq(rolePermissionTable.permissionId, permissionTable.id),
      );
  }

  create(role: RoleInsert, options?: QueryOptions) {
    return this.query(options).insert(roleTable).values(role).$returningId();
  }

  update(id: number, role: RoleUpdate, options?: QueryOptions) {
    return this.query(options)
      .update(roleTable)
      .set(role)
      .where(eq(roleTable.id, id));
  }

  delete(id: number, options?: QueryOptions) {
    return this.query(options).delete(roleTable).where(eq(roleTable.id, id));
  }
}
