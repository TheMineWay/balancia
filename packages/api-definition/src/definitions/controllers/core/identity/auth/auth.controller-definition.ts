import { Permission, ROLE_SCHEMA, USER_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const MY_INFO_ENDPOINT = {
	getPath: () => ["my-info"],
	paramsMapping: {},
	method: EndpointMethod.GET,
	responseDto: z.object({
		user: USER_SCHEMA,
		permissions: z.array(z.enum(Permission)),
		roles: z.array(ROLE_SCHEMA),
	}),
} satisfies EndpointDefinition;

/* Definition */

export const AUTH_CONTROLLER = {
	getPath: () => ["auth"],
	paramsMapping: {},
	endpoints: {
		"my-info": MY_INFO_ENDPOINT,
	},
} satisfies ControllerDefinition;
