import { AxiosRequestConfig } from "axios";
import { ControllerDefinition } from "../types";
import { getEndpointPath } from "./get-endpoint-path.util";

type Options<P> = {
  config?: AxiosRequestConfig;
  params?: P;
};

export const getEndpointRequest = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"],
>(
  host: string,
  controller: C,
  endpoint: E,
  options?: Options<Parameters<typeof getEndpointPath>[3]>
): AxiosRequestConfig => {
  return {
    url: getEndpointPath(host, controller, endpoint, options?.params),
    method: controller.endpoints[endpoint as string].method,
    ...options?.config,
  };
};
