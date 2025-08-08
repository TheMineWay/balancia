import type { RequestOptions } from "@core/requests/hooks/use-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type {
	ControllerDefinition,
	GetEndpointRequestOptions,
	getEndpointRequest,
} from "@shared/api-definition";
import type { AxiosError, AxiosResponse } from "axios";

/**
 * NOTE:
 * - The 'endpointQuery' derives its behavior from this method.
 */

/**
 * Perform a request to the API
 */
export const endpointMutation = <
	C extends ControllerDefinition,
	EK extends keyof C["endpoints"],
>(
	controller: C,
	endpoint: EK,
	params: Parameters<typeof getEndpointRequest<C, EK>>[3],
	requestFn: (options: RequestOptions) => Promise<AxiosResponse | AxiosError>,
) => {
	return async (options: GetEndpointRequestOptions<C["endpoints"][EK]>) => {
		// Derives its behavior from the endpointQuery.
		return endpointQuery(controller, endpoint, params, requestFn, options)();
	};
};
