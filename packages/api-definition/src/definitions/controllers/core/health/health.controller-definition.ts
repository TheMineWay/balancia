import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const HEALTH_RESPONSE_ITEM_SCHEMA = z.object({
	status: z.enum(["up", "degraded", "down"]),
	message: z.string().optional(),
});

/* Each health check item represents a specific component or subsystem's health status */
const HEALTH_CHECKS_SCHEMA = z.object({
	memory_heap: HEALTH_RESPONSE_ITEM_SCHEMA.optional(),
	memory_rss: HEALTH_RESPONSE_ITEM_SCHEMA.optional(),
	main_database: HEALTH_RESPONSE_ITEM_SCHEMA.optional(),
	external_auth_service: HEALTH_RESPONSE_ITEM_SCHEMA.optional(),
});

const HEALTH_RESPONSE_SCHEMA = z.object({
	status: z.enum(["ok", "error", "shutting_down"]),
	info: HEALTH_CHECKS_SCHEMA.optional(),
	error: HEALTH_CHECKS_SCHEMA.optional(),
	details: HEALTH_CHECKS_SCHEMA.optional(),
});

const GET = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.GET,
	responseDto: HEALTH_RESPONSE_SCHEMA,
} satisfies EndpointDefinition;

export const HEALTH_CONTROLLER = {
	getPath: () => ["health"],
	paramsMapping: {},
	endpoints: {
		get: GET,
	},
} satisfies ControllerDefinition;
