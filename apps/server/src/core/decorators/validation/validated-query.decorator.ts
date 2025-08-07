import type { ExecutionContext } from "@nestjs/common";
import { BadRequestException, createParamDecorator } from "@nestjs/common";
import type { ControllerDefinition } from "@shared/api-definition";
import type { Request } from "express";
import * as qs from "qs";

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
		const queryString = request.url.split("?")[1] || "";
		const parsedQuery = qs.parse(queryString);

		const result = schema.safeParse(parsedQuery);

		if (!result.success) {
			throw new BadRequestException({
				message: "Validation failed",
				errors: result.error.message,
			});
		}

		return result.data;
	})();
