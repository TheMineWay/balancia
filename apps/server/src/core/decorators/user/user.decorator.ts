import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import type { UserModel } from "@shared/models";

export type UserTokenData = Pick<UserModel, "id">;

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request & { user: UserTokenData } = ctx
      .switchToHttp()
      .getRequest();
    return request.user;
  },
);
