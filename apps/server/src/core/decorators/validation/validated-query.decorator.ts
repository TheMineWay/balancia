import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import type { ControllerDefinition } from "@shared/api-definition";

export const ValidatedQuery = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"],
>(
  controller: C,
  endpoint: E,
) =>
  createParamDecorator((_, ctx: ExecutionContext) => {
    const schema = controller.endpoints[endpoint as string].queryDto;
    if (!schema) return {};

    const request: Request = ctx.switchToHttp().getRequest();
    const queryParams = new URLSearchParams(request.url.split("?")[1]);
    const result = schema.safeParse(queryParams);

    if (!result.success) {
      throw new BadRequestException({
        message: "Validation failed",
        errors: result.error.message,
      });
    }

    return result.data;
  })();
