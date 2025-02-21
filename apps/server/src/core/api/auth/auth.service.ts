import { UserTokenData } from "@core/decorators/user/user.decorator";
import { compareHashWithSalt } from "@core/utils/cryptography/password-hashing.util";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CONTROLLERS, InferEndpointDTO } from "@shared/api-definition";
import { TOTP } from "otpauth";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({
    username,
    password,
    totp,
  }: InferEndpointDTO<typeof CONTROLLERS.auth, "login">) {
    const user = await this.usersService.findByUsername(username);
    if (!user?.password || !compareHashWithSalt(user.password, password))
      throw new UnauthorizedException();

    if (!this.validateTotp(totp ?? null, user.totpSecret))
      throw new UnauthorizedException("TOTP");

    const payload: UserTokenData = {
      id: user.id,
      username: user.username,
    };

    const { password: _, totpSecret: __, ...restUser } = user;
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: restUser,
    };
  }

  validateTotp(providedCode: string | null, totpSecret: string | null) {
    if (!totpSecret) return true; // The user does not have 2FA enabled
    if (!providedCode) return false;

    const totp = new TOTP({
      secret: totpSecret,
    });

    const token = totp.generate();
    return providedCode === token;
  }
}
