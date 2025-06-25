import { UserService } from "@core/api/user/user.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import {
  JWT_TOKEN_SCHEMA,
  OPEN_ID_CONFIG_SCHEMA,
  type JwtToken,
} from "@shared/models";
import axios from "axios";
import * as jwt from "jsonwebtoken";

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

  static async getOpenIdConfiguration(issuerUrl: string) {
    const configResponse = await axios.get(
      issuerUrl + ".well-known/openid-configuration",
    );

    return OPEN_ID_CONFIG_SCHEMA.parse(configResponse.data);
  }
}
