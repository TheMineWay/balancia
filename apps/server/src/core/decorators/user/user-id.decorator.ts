import { UserTokenData } from "@core/decorators/user/user.decorator";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserTokenData;
    return user.id;
  },
);
