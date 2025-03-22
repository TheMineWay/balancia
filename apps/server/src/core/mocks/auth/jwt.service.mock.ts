import type { JwtService } from "@nestjs/jwt";

export const JWT_SERVICE_MOCK: JwtService = Object.assign({
  signAsync: async () => "VALID TOKEN",
});
