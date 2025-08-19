import { type QueryOptions, Repository } from "@database/repository/repository";
import {
	permissionTable,
	rolePermissionTable,
	userRoleTable,
	userTable,
} from "@database/schemas/main.schema";
import { PermissionSelect } from "@database/schemas/main/tables/identity/permission.table";
import {
	type RoleInsert,
	type RoleUpdate,
	roleTable,
} from "@database/schemas/main/tables/identity/role.table";
import { Injectable } from "@nestjs/common";
import {
	PaginatedQuery,
	RoleModel,
	SearchModel,
	UserModel,
} from "@shared/models";
import { and, countDistinct, desc, eq, ilike, inArray, sql } from "drizzle-orm";

@Injectable()
export class RoleRepository extends Repository {
	async findAll(options?: QueryOptions) {
		return await this.query(options).select().from(roleTable);
	}

	async findByUserAndRole(
		userId: UserModel["id"],
		roleId: RoleModel["id"],
		options?: QueryOptions,
	) {
		const userRole = await this.query(options)
			.select()
			.from(userRoleTable)
			.where(
				and(eq(userRoleTable.userId, userId), eq(userRoleTable.roleId, roleId)),
			)
			.limit(1);

		return userRole.length > 0 ? userRole[0] : null;
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
				permissionsCount: sql<number>`coalesce(${pc.count}::int, 0)`.as(
					"permissionsCount",
				),
				usersCount: sql<number>`coalesce(${uc.count}::int, 0)`.as("usersCount"),
			})
			.from(roleTable)
			.leftJoin(pc, eq(roleTable.id, pc.roleId))
			.leftJoin(uc, eq(roleTable.id, uc.roleId));
	}

	create(role: RoleInsert, options?: QueryOptions) {
		return this.query(options)
			.insert(roleTable)
			.values(role)
			.returning({ id: roleTable.id });
	}

	async update(id: number, role: RoleUpdate, options?: QueryOptions) {
		return await this.query(options)
			.update(roleTable)
			.set(role)
			.where(eq(roleTable.id, id));
	}

	delete(id: number, options?: QueryOptions) {
		return this.query(options).delete(roleTable).where(eq(roleTable.id, id));
	}

	assignRole(
		roleId: RoleModel["id"],
		userId: UserModel["id"],
		options?: QueryOptions,
	) {
		return this.query(options).insert(userRoleTable).values({ roleId, userId });
	}

	unassignRole(
		roleId: RoleModel["id"],
		userId: UserModel["id"],
		options?: QueryOptions,
	) {
		return this.query(options)
			.delete(userRoleTable)
			.where(
				and(eq(userRoleTable.roleId, roleId), eq(userRoleTable.userId, userId)),
			);
	}

	async findRoleUsersList(
		roleId: RoleModel["id"],
		pagination: PaginatedQuery,
		search: SearchModel = { search: null },
		options?: QueryOptions,
	) {
		const parsedTextSearch = search.search
			? search.search.trim().toLowerCase()
			: null;

		const q = this.query(options)
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
						? ilike(userTable.name, `%${parsedTextSearch}%`)
						: undefined,
				),
			)
			.orderBy(desc(userRoleTable.createdAt))
			.$dynamic();

		const { rows, count } = await super.paginated(pagination, q);

		return {
			items: rows,
			total: count,
		};
	}

	async findRolePermissions(roleId: RoleModel["id"], options?: QueryOptions) {
		return await this.query(options)
			.select({ id: permissionTable.id, code: permissionTable.code })
			.from(rolePermissionTable)
			.where(eq(rolePermissionTable.roleId, roleId))
			.innerJoin(
				permissionTable,
				eq(rolePermissionTable.permissionId, permissionTable.id),
			);
	}

	async addRolePermissions(
		roleId: RoleModel["id"],
		permissionIds: PermissionSelect["id"][],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.insert(rolePermissionTable)
			.values(
				permissionIds.map((permissionId) => ({
					roleId,
					permissionId,
				})),
			);
	}

	async deleteRolePermissionsByRoleAndPermissions(
		roleId: RoleModel["id"],
		permissionIds: PermissionSelect["id"][],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.delete(rolePermissionTable)
			.where(
				and(
					eq(rolePermissionTable.roleId, roleId),
					inArray(rolePermissionTable.permissionId, permissionIds),
				),
			);
	}

	async deleteRolePermissionsByRole(
		roleId: RoleModel["id"],
		options?: QueryOptions,
	) {
		return await this.query(options)
			.delete(rolePermissionTable)
			.where(eq(rolePermissionTable.roleId, roleId));
	}

	findPermissions(options?: QueryOptions) {
		return this.query(options).select().from(permissionTable);
	}
}
