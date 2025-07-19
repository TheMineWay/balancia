import type { RequestOptions } from "@common/core/requests/hooks/use-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import type {
  ControllerDefinition,
  getEndpointRequest,
  GetEndpointRequestOptions,
} from "@shared/api-definition";
import type { AxiosResponse } from "axios";

/**
 * NOTE:
 * - The 'endpointQuery' derives its behavior from this method.
 */

/**
 * Perform a request to the API
 */
export const endpointMutation = <
  C extends ControllerDefinition,
  EK extends keyof C["endpoints"]
>(
  controller: C,
  endpoint: EK,
  params: Parameters<typeof getEndpointRequest<C, EK>>[3],
  requestFn: (options: RequestOptions) => Promise<AxiosResponse>
) => {
  return async (options: GetEndpointRequestOptions<C["endpoints"][EK]>) => {
    // Derives its behavior from the endpointQuery.
    return endpointQuery(controller, endpoint, params, requestFn, options)();
  };
};
