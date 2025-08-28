import { USER_PREFERENCES_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import z from "zod";

// Endpoints

const GET_MY_PREFERENCES = {
	getPath: () => ["my-preferences"],
	paramsMapping: {},
	responseDto: z.object({
		preferences: USER_PREFERENCES_SCHEMA.nullable(),
	}),
} satisfies EndpointDefinition;

// Controller

export const USER_PREFERENCES_CONTROLLER = {
	getPath: () => ["user-preferences"],
	paramsMapping: {},
	endpoints: {
		getMyPreferences: GET_MY_PREFERENCES,
	},
} satisfies ControllerDefinition;
