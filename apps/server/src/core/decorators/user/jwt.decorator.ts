import { AuthService } from "@core/api/auth/auth.service";
import type { UserTokenData } from "@core/decorators/user/user.decorator";
import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import { extractTokenFromHeader } from "@utils/extract-token-from-header.util";
import type { Request } from "express";

export const Jwt = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request: Request & { user: UserTokenData } = ctx
    .switchToHttp()
    .getRequest();
  const accessToken = extractTokenFromHeader(request);

  if (!accessToken) throw new BadRequestException();

  return AuthService.parseJwtToken(accessToken);
});
