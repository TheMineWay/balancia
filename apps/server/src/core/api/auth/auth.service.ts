import { OidcService } from "@core/api/auth/open-id-connect/oidc.service";
import { UserService } from "@core/api/user/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly oidcService: OidcService,
  ) {}

  async loginFromOidcCode(code: string) {
    const token = await this.oidcService.getTokenFromCode(code);
    const user = await this.userService.getByUsername("john.doe");

    return {
      token,
      user,
    };
  }
}
