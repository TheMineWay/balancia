import {
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
	USER_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const USER_LIST_ENDPOINT = {
	getPath: () => ["list"],
	paramsMapping: {},
	responseDto: getPaginatedResponse(USER_SCHEMA),
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
	method: EndpointMethod.GET,
} satisfies EndpointDefinition;

// Controller

export const ADMIN_USER_CONTROLLER = {
	getPath: () => ["admin-user"],
	paramsMapping: {},
	endpoints: {
		list: USER_LIST_ENDPOINT,
	},
} satisfies ControllerDefinition;
