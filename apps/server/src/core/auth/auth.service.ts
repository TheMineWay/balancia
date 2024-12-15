import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareHashWithSalt } from "@utils/cryptography/password-hashing.util";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user?.password || !compareHashWithSalt(user.password, password))
      throw new UnauthorizedException();

    const payload = {
      id: user.id,
      username: user.username,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
