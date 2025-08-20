import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import z from "zod";

const INFO_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	responseDto: z.object({
		expectedClientVersion: z.string(),
	}),
} satisfies EndpointDefinition;

/* Definition */

export const SERVER_INFO_CONTROLLER = {
	getPath: () => ["server-info"],
	paramsMapping: {},
	endpoints: {
		"get-server-info": INFO_ENDPOINT,
	},
} satisfies ControllerDefinition;
