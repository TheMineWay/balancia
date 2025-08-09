import { AuthRepository } from "@core/auth/auth/repositories/auth.repository";
import { UserService } from "@core/auth/user/user.service";
import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
import type { RoleSelect } from "@database/schemas/main/tables/identity/role.table";
import { UserInsert } from "@database/schemas/main/tables/identity/user.table";
import { AuthDirectoryService } from "@external/auth-directory/auth-directory.service";
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from "@nestjs/common";
import {
	JWT_TOKEN_SCHEMA,
	type JwtToken,
	OPEN_ID_CONFIG_SCHEMA,
	type Permission,
	type RoleModel,
	type UserModel,
} from "@shared/models";
import axios from "axios";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly authRepository: AuthRepository,
		private readonly userAuthInfoCacheService: UserAuthInfoCacheService,
		private readonly authDirectoryService: AuthDirectoryService,
	) {}

	/**
	 * Given a JWT token from a non registered user, it checks if the user exists in the directory and its data gets integrated.
	 */
	async checkIn(jwt: JwtToken) {
		const directoryUser = await this.authDirectoryService.getUserByCode(jwt.sub);
		if (!directoryUser) throw new NotFoundException();

		const newUser: Omit<UserInsert, 'code'> = {
			name: directoryUser.name,
			username: directoryUser.username,
			email: directoryUser.email,
		};
		return await this.userService.findOrCreateByCode(jwt.sub, newUser);
	}

	static parseJwtToken(token: string): JwtToken {
		const decoded = jwt.decode(token);
		const parsed = JWT_TOKEN_SCHEMA.safeParse(decoded);

		if (parsed.success) return parsed.data;

		throw new BadRequestException();
	}

	static async getOpenIdConfiguration(issuerUrl: string) {
		const configResponse = await axios.get(
			issuerUrl + ".well-known/openid-configuration",
		);

		return OPEN_ID_CONFIG_SCHEMA.parse(configResponse.data);
	}

	/* User data */
	/**
	 * Returns permissions and roles for a specific user.
	 */
	async getUserAuthInfo(
		userId: UserModel["id"],
	): Promise<{ permissions: Permission[]; roles: RoleModel[] }> {
		const authInfo = await this.userAuthInfoCacheService.getById(
			userId,
			// Fallback
			async (uid) => {
				const info = await this.authRepository.getUserPermissionsInfo(uid);
				return AuthService.groupUserPermissionInfo(info);
			},
		);

		if (!authInfo) throw new NotFoundException();

		return authInfo;
	}

	/**
	 * Given the result of querying for user auth info, groups the permissions and roles by user.
	 */
	static groupUserPermissionInfo(rowGroups: UserPermissionInfoQueryResult): {
		permissions: Permission[];
		roles: RoleSelect[];
	} {
		const permissions = new Set<Permission>();
		const roles = new Set<RoleModel>();

		for (const group of rowGroups) {
			// Add permission
			const permission = group.permission?.code;
			if (permission) permissions.add(permission);

			// Add role
			const role = group.role;
			if (role) roles.add(role);
		}

		return {
			permissions: Array.from(permissions),
			roles: Array.from(roles),
		};
	}

	/**
	 * Returns user information along with their permissions and roles.
	 */
	async getUserInfo(userId: UserModel["id"]) {
		const user = await this.userService.getById(userId);
		if (!user) throw new NotFoundException();

		const { permissions, roles } = await this.getUserAuthInfo(userId);

		return {
			user,
			permissions,
			roles,
		};
	}
}

/* Internal types */
type UserPermissionInfoQueryResult = Awaited<
	ReturnType<AuthRepository["getUserPermissionsInfo"]>
>;
