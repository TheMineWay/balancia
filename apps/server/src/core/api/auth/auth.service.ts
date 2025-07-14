import { UserService } from "@core/api/user/user.service";
import { UserAuthInfoCacheService } from "@core/cache/caches/user-auth-info-cache.service";
import { AuthRepository } from "@database/repository/core/auth/auth.repository";
import { RoleSelect } from "@database/schemas/main/tables/identity/role.table";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  JWT_TOKEN_SCHEMA,
  OPEN_ID_CONFIG_SCHEMA,
  Permission,
  RoleModel,
  UserModel,
  type JwtToken,
} from "@shared/models";
import axios from "axios";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
    private readonly userAuthInfoCacheService: UserAuthInfoCacheService,
  ) {}

  async checkIn(jwt: JwtToken) {
    //await this.userService.findOrCreateByCode(jwt.sub); // TODO: implement with OIDC user data
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
}

/* Internal types */
type UserPermissionInfoQueryResult = Awaited<
  ReturnType<AuthRepository["getUserPermissionsInfo"]>
>;
