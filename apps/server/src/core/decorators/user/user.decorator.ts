import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import { JWT_TOKEN_SCHEMA, type UserModel } from "@shared/models";
import { extractTokenFromHeader } from "@utils/extract-token-from-header.util";
import type { Request } from "express";
import * as jwt from "jsonwebtoken";

export type UserTokenData = Pick<UserModel, "id">;

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Request & { user: UserTokenData } = ctx
      .switchToHttp()
      .getRequest();

    const token = extractTokenFromHeader(request);
    if (!token) throw new BadRequestException();

    const parsed = jwt.decode(token);
    const user = JWT_TOKEN_SCHEMA.safeParse(parsed);

    if (user.error) throw new BadRequestException();

    return user.data;
  },
);
