import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import { JWT_TOKEN_SCHEMA, type UserModel } from "@shared/models";

export type UserTokenData = Pick<UserModel, "id">;

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Request & { user: UserTokenData } = ctx
      .switchToHttp()
      .getRequest();

    const user = JWT_TOKEN_SCHEMA.safeParse(request.headers["authorization"]);

    if (user.error) throw new BadRequestException();

    return user.data;
  },
);
