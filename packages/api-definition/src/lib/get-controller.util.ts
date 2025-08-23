import { getPath } from "@/lib/get-path.util";
import { ControllerDefinition } from "@ts-types/controller-definition.type";

/**
 * Utility function that generates a controller path by applying parameters to a controller definition.
 * Delegates to the getPath utility for parameter substitution.
 */
export const getController = <
	P extends Record<string, string>,
	C extends ControllerDefinition<P> = ControllerDefinition<P>,
>(
	controller: C,
	params: P,
) => getPath(controller, params);
