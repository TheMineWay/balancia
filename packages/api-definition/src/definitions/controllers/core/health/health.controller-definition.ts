import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.GET,
	responseDto: z.object({}),
} satisfies EndpointDefinition;

export const HEALTH_CONTROLLER = {
	getPath: () => ["health"],
	paramsMapping: {},
	endpoints: {
		get: GET,
	},
} satisfies ControllerDefinition;
