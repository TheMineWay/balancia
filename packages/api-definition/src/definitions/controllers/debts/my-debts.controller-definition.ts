import type { ControllerDefinition } from "@ts-types/controller-definition.type";

export const MY_DEBTS_CONTROLLER = {
	getPath: () => ["my-debts"],
	paramsMapping: {},
	endpoints: {
		// Define endpoints here as needed
	},
} satisfies ControllerDefinition;
