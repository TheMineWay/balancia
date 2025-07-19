import type { RequestOptions } from "@common/core/requests/hooks/use-request.util";
import type { getClientEndpointRequest } from "@common/core/requests/lib/get-client-endpoint-request.util";
import { ENV } from "@constants/env/env.constant";
import type {
  ControllerDefinition,
  InferBodyDto,
} from "@shared/api-definition";
import { getEndpointRequest } from "@shared/api-definition";
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
  E extends keyof C["endpoints"]
>(
  controller: C,
  endpoint: E,
  requestFn: (options: RequestOptions) => Promise<AxiosResponse>,
  options?: Parameters<typeof getClientEndpointRequest>[2]
) => {
  return async (data: InferBodyDto<C, E>) => {
    const { request, onResponse } = getEndpointRequest(
      ENV.api.host,
      controller,
      endpoint,
      {},
      {}
    );
    const response = await requestFn(request);

    return onResponse(response.data);
  };
};
