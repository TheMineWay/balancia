import { LoginDTO } from "@dto/core/auth/login.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareHashWithSalt } from "@utils/cryptography/password-hashing.util";
import { TOTP } from "otpauth";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn({ username, password, totp }: LoginDTO) {
    const user = await this.usersService.findByUsername(username);
    if (!user?.password || !compareHashWithSalt(user.password, password))
      throw new UnauthorizedException();

    if (!(await this.validateTotp(totp ?? null, user.totpSecret)))
      throw new UnauthorizedException("TOTP");

    const payload = {
      id: user.id,
      username: user.username,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }

  async validateTotp(providedCode: string | null, totpSecret: string | null) {
    if (!totpSecret) return true; // The user does not have 2FA enabled
    if (!providedCode) return false;

    const totp = new TOTP({
      secret: totpSecret,
    });

    const token = totp.generate();
    return providedCode === token;
  }
}
