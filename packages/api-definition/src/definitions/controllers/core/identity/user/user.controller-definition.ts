import { USER_SCHEMA } from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";

/* DTOs */

export const USER_CONTROLLER = {
	getPath: () => ["me"],
	paramsMapping: {},
	endpoints: {
		get: {
			getPath: () => [],
			paramsMapping: {},
			responseDto: USER_SCHEMA,
		},
	},
} satisfies ControllerDefinition;
