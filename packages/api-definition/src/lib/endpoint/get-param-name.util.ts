import type { ControllerDefinition } from "@ts-types/controller-definition.type";

/**
 * Utility function to retrieve the parameter name mapping for a specific endpoint parameter.
 * Used for extracting parameter names from controller and endpoint definitions.
 */
export const getParamName = <
	C extends ControllerDefinition,
	E extends keyof C["endpoints"],
	P extends keyof C["endpoints"][E]["paramsMapping"],
>(
	controller: C,
	endpoint: E,
	param: P,
) => {
	return controller.endpoints[endpoint as string].paramsMapping[param];
};
