import type { UserTokenData } from "@core/decorators/user/user-id.decorator";
import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import type { JwtToken } from "@shared/models";
import type { Request } from "express";

export const Jwt = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
	const request: Request & { user: UserTokenData } = ctx
		.switchToHttp()
		.getRequest();

	return request.user as unknown as JwtToken;
});
