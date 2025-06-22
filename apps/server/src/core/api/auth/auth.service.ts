import { UserService } from "@core/api/user/user.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JWT_TOKEN_SCHEMA, type JwtToken } from "@shared/models";
import jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async checkIn(jwt: JwtToken) {
    await this.userService.findOrCreateByCode(jwt.sub);
  }

  static parseJwtToken(token: string): JwtToken {
    const decoded = jwt.decode(token);
    const parsed = JWT_TOKEN_SCHEMA.safeParse(decoded);
    if (parsed.success) return parsed.data;

    throw new BadRequestException();
  }
}
