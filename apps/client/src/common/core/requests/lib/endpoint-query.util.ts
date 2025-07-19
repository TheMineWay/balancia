import type { RequestOptions } from "@common/core/requests/hooks/use-request.util";
import { ENV } from "@constants/env/env.constant";
import {
  getEndpointRequest,
  type ControllerDefinition,
  type GetEndpointRequestOptions,
} from "@shared/api-definition";
import type { AxiosResponse } from "axios";

/**
 * Perform a request into the API
 */
export const endpointQuery = <
  C extends ControllerDefinition,
  EK extends keyof C["endpoints"]
>(
  controller: C,
  endpoint: EK,
  params: Parameters<typeof getEndpointRequest<C, EK>>[3],
  requestFn: (options: RequestOptions) => Promise<AxiosResponse>,
  options: GetEndpointRequestOptions<C["endpoints"][EK]>
) => {
  return async () => {
    const { request, onResponse } = getEndpointRequest(
      ENV.api.host,
      controller,
      endpoint,
      params,
      options
    );
    const response = await requestFn(request);

    return onResponse(response.data);
  };
};
