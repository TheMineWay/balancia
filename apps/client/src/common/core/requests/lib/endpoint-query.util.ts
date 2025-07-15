import type { RequestOptions } from "@common/core/requests/hooks/use-request.util";
import { endpointMutation } from "@common/core/requests/lib/endpoint-mutation.util";
import type { getClientEndpointRequest } from "@common/core/requests/lib/get-client-endpoint-request.util";
import type { ControllerDefinition } from "@shared/api-definition";
import type { AxiosResponse } from "axios";

/**
 * Perform a request into the API
 */
export const endpointQuery = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"]
>(
  controller: C,
  endpoint: E,
  requestFn: (options: RequestOptions) => Promise<AxiosResponse>,
  options?: Parameters<typeof getClientEndpointRequest>[2]
) => {
  // This method derives its behaviour from the endpointMutation.
  return () =>
    endpointMutation(controller, endpoint, requestFn, options)(null as never);
};
