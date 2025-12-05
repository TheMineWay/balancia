import {
	All,
	applyDecorators,
	Delete,
	Get,
	Head,
	Options,
	Patch,
	Post,
	Put,
} from "@nestjs/common";
import type { ControllerDefinition } from "@shared/api-definition";
import { EndpointMethod, getPath } from "@shared/api-definition";

const decoratorMapper = (method?: EndpointMethod) => {
	switch (method) {
		case EndpointMethod.GET:
			return Get;
		case EndpointMethod.POST:
			return Post;
		case EndpointMethod.PUT:
			return Put;
		case EndpointMethod.DELETE:
			return Delete;
		case EndpointMethod.PATCH:
			return Patch;
		case EndpointMethod.ALL:
			return All;
		case EndpointMethod.OPTIONS:
			return Options;
		case EndpointMethod.HEAD:
			return Head;
		default:
			return Get;
	}
};

/**
 * Decorator that automatically configures NestJS endpoints based on controller definitions.
 * Maps endpoint configurations to appropriate HTTP method decorators with parameter routing.
 */
export function Endpoint<
	C extends ControllerDefinition,
	E extends keyof C["endpoints"],
>(controller: C, endpoint: E): MethodDecorator {
	const e = controller.endpoints[endpoint as string];

	if (!e)
		throw new Error(
			`Endpoint ${String(endpoint)} not found in controller ${controller.getPath({})}`,
		);

	const params = e.paramsMapping;
	const mappedParams: Record<string, string> = {};

	for (const [key, value] of Object.entries(params ?? {})) {
		mappedParams[key] = `:${value}`;
	}

	return applyDecorators(decoratorMapper(e.method)(getPath(e, mappedParams)));
}
