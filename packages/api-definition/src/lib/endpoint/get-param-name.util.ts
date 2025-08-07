import type { ControllerDefinition } from "@ts-types/controller-definition.type";

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
