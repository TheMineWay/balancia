import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) throw new UnauthorizedException();

    const payload = {
      id: user.id,
    };
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return { token: await this.jwtService.signAsync(payload) };
  }
}
