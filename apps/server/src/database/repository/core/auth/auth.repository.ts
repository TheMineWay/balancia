import {
  type QueryOptions,
  Repository,
} from "@database/repository/core/repository";
import {
  rolePermissionTable,
  roleTable,
  userRoleTable,
} from "@database/schemas/main.schema";
import { permissionTable } from "@database/schemas/main/tables/identity/permission.table";
import { Injectable } from "@nestjs/common";
import type { UserModel } from "@shared/models";
import { eq } from "drizzle-orm";

@Injectable()
export class AuthRepository extends Repository {
  /**
   * Returns permissions and roles for a specific user.
   */
  async getUserPermissionsInfo(
    userId: UserModel["id"],
    options?: QueryOptions,
  ) {
    const info = await this.query(options)
      .select()
      .from(userRoleTable)
      .leftJoin(roleTable, eq(userRoleTable.roleId, roleTable.id))
      .leftJoin(
        rolePermissionTable,
        eq(roleTable.id, rolePermissionTable.roleId),
      )
      .leftJoin(
        permissionTable,
        eq(rolePermissionTable.permissionId, permissionTable.id),
      )
      .where(eq(userRoleTable.userId, userId));

    return info;
  }
}
