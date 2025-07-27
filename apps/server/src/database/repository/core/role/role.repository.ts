import { queryWithCount, withPagination } from "@database/common/pagination";
import {
  type QueryOptions,
  Repository,
} from "@database/repository/core/repository";
import {
  rolePermissionTable,
  userRoleTable,
  userTable,
} from "@database/schemas/main.schema";
import {
  type RoleInsert,
  type RoleUpdate,
  roleTable,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import { PaginatedQuery, RoleModel } from "@shared/models";
import { and, countDistinct, desc, eq, like, sql } from "drizzle-orm";

@Injectable()
export class RoleRepository extends Repository {
  async findAll(options?: QueryOptions) {
    return await this.query(options).select().from(roleTable);
  }

  async findWithStatistics(options?: QueryOptions) {
    // Count permissions
    const pc = this.query(options)
      .select({
        roleId: rolePermissionTable.roleId,
        count: countDistinct(rolePermissionTable.permissionId).as(
          "permissionsCount",
        ),
      })
      .from(rolePermissionTable)
      .groupBy(rolePermissionTable.roleId)
      .as("pc");

    // Count users
    const uc = this.query(options)
      .select({
        roleId: userRoleTable.roleId,
        count: countDistinct(userRoleTable.userId).as("usersCount"),
      })
      .from(userRoleTable)
      .groupBy(userRoleTable.roleId)
      .as("uc");

    return await this.query(options)
      .select({
        id: roleTable.id,
        name: roleTable.name,
        createdAt: roleTable.createdAt,
        updatedAt: roleTable.updatedAt,
        permissionsCount: sql<number>`coalesce(${pc.count}, 0)`.as(
          "permissionsCount",
        ),
        usersCount: sql<number>`coalesce(${uc.count}, 0)`.as("usersCount"),
      })
      .from(roleTable)
      .groupBy(roleTable.id)
      .leftJoin(pc, eq(roleTable.id, pc.roleId))
      .leftJoin(uc, eq(roleTable.id, uc.roleId));
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

  async findRoleUsersList(
    roleId: RoleModel["id"],
    pagination: PaginatedQuery,
    textSearch: string | null = null,
    options?: QueryOptions,
  ) {
    const parsedTextSearch = textSearch
      ? textSearch.trim().toLowerCase()
      : null;

    const query = withPagination(
      this.query(options)
        .select({
          id: userTable.id,
          name: userTable.name,
          code: userTable.code,
          email: userTable.email,
          username: userTable.username,
          createdAt: userTable.createdAt,
          updatedAt: userTable.updatedAt,
        })
        .from(userRoleTable)
        .innerJoin(userTable, eq(userRoleTable.userId, userTable.id))
        .where(
          and(
            eq(userRoleTable.roleId, roleId),
            parsedTextSearch
              ? like(userTable.name, parsedTextSearch)
              : undefined,
          ),
        )
        .orderBy(desc(userRoleTable.createdAt))
        .$dynamic(),
      pagination.page,
      pagination.limit,
    );

    const [items, total] = await queryWithCount(query);

    return {
      items,
      total,
    };
  }
}
