import { Injectable } from "@nestjs/common";

@Injectable()
export class OidcService {
  async getTokenFromCode(code: string): Promise<string> {
    return "JWT";
  }
}
