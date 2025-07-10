import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import type { JwtToken, UserModel } from "@shared/models";

export type UserTokenData = Pick<UserModel, "id">;

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Request & { user: UserTokenData } = ctx
      .switchToHttp()
      .getRequest();

    const user = request.user as unknown as { payload: JwtToken } & UserModel;

    if (!user) throw new BadRequestException();

    const { payload: __, ...userData } = user;

    return userData;
  },
);
