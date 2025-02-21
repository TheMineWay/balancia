import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserModel } from "@shared/models";

export type UserTokenData = Pick<UserModel, "id" | "username">;

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
