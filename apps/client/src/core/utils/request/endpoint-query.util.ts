import { RequestOptions } from "@core/hooks/utils/api/use-request.util";
import { endpointMutation } from "@core/utils/request/endpoint-mutation.util";
import { getClientEndpointRequest } from "@core/utils/request/get-client-endpoint-request.util";
import {
  ControllerDefinition,
} from "@shared/api-definition";
import { AxiosResponse } from "axios";

/**
 * Perform a request into the API
 */
export const endpointQuery = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"],
>(
  controller: C,
  endpoint: E,
  requestFn: (options: RequestOptions) => Promise<AxiosResponse>,
  options?: Parameters<typeof getClientEndpointRequest>[2]
) => {
  // This method derives its behaviour from the endpointMutation.
  return () => endpointMutation(controller, endpoint, requestFn, options)(null as never);
};
