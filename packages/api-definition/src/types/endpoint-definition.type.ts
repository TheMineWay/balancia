import type { EndpointMethod } from "@ts-types/endpoint-method.enum";
import { Path } from "@ts-types/path/path.type";
import type { ZodObject } from "zod";

export type EndpointDefinition<P extends Record<string, string> = {}> = {
	method?: EndpointMethod;

	/* DTOs */
	bodyDto?: ZodObject;
	responseDto?: ZodObject;
	queryDto?: ZodObject;
} & Path<P>;
