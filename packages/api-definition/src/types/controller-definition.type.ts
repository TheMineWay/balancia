import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { Path } from "@ts-types/path/path.type";

export type ControllerDefinition<P extends Record<string, string> = {}> =
	Path<P> & {
		endpoints: Record<string, EndpointDefinition<any>>;
	};
