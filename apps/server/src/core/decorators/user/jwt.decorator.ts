import { AuthService } from "@core/api/auth/auth.service";
import type { UserTokenData } from "@core/decorators/user/user.decorator";
import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";

export const Jwt = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request: Request & { user: UserTokenData } = ctx
    .switchToHttp()
    .getRequest();
  const accessToken = request.headers["Authorization"] as string | undefined;

  if (!accessToken) throw new BadRequestException();

  return AuthService.parseJwtToken(accessToken);
});
