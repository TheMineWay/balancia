import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import type { ControllerDefinition } from "@shared/api-definition";

export const ValidatedBody = <
	C extends ControllerDefinition,
	E extends keyof C["endpoints"],
>(
	controller: C,
	endpoint: E,
) =>
	createParamDecorator((_, ctx: ExecutionContext) => {
		const schema = controller.endpoints[endpoint as string]?.bodyDto;
		if (!schema) return {};

		const request: Request = ctx.switchToHttp().getRequest();
		const result = schema.safeParse(request.body);

		if (!result.success) {
			throw new BadRequestException({
				message: "Validation failed",
				errors: result.error.message,
			});
		}

		return result.data;
	})();
