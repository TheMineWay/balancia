import type { JwtRequestUserInfo } from "@core/api/auth/strategies/jwt.strategy";
import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import type { UserModel } from "@shared/models";

export type UserTokenData = Pick<UserModel, "id">;

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Request & { user: UserTokenData } = ctx
      .switchToHttp()
      .getRequest();

    const user = request.user as unknown as JwtRequestUserInfo;

    if (!user) throw new BadRequestException();

    return user.user;
  },
);
