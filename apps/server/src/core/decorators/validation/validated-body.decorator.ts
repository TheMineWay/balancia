import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { ZodSchema } from "zod";

export const ValidatedBody = (schema: ZodSchema) =>
  createParamDecorator((_, ctx: ExecutionContext) => {
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
