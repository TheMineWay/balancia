import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { ControllerDefinition, getEndpointDTO } from "@shared/api-definition";

export const ValidatedBody = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"],
>(
  controller: C,
  endpoint: E,
) =>
  createParamDecorator((_, ctx: ExecutionContext) => {
    const schema = getEndpointDTO(controller, endpoint);
    if (!schema) return {};

    const request: Request = ctx.switchToHttp().getRequest();
    const result = schema.safeParse(request.body);

    if (!result.success) {
      throw new BadRequestException({
        message: "Validation failed",
        errors: result.error.format(),
      });
    }

    return result.data;
  })();
