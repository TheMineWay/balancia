import { ENV } from "@constants/env/env.constant";
import type {
  ControllerDefinition,
  InferEndpointDTO,
} from "@shared/api-definition";
import { getEndpointRequest } from "@shared/api-definition";

/**
 * Allows you to get the request configuration for a specific endpoint of a controller.
 */
export const getClientEndpointRequest = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"]
>(
  controller: C,
  endpoint: E,
  options: Parameters<typeof getEndpointRequest>[3] & {
    data?: InferEndpointDTO<C, E>;
    host?: string;
  } = {}
) => {
  const { data, host, ...restOptions } = options;
  return {
    ...getEndpointRequest(host ?? ENV.api.host, controller, endpoint, {
      ...restOptions,
      config: {
        data,
        ...restOptions.config,
      },
    }),
  };
};
