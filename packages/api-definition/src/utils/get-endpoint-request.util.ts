import type { AxiosRequestConfig } from "axios";
import {
  ControllerDefinition,
  EndpointMethod,
  InferEndpointDTO,
} from "../types";
import { getEndpointPath } from "./get-endpoint-path.util";

type Options<P> = {
  config?: AxiosRequestConfig;
  params?: P;
};

export const getEndpointRequest = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"]
>(
  host: string,
  controller: C,
  endpoint: E,
  options?: Options<Parameters<typeof getEndpointPath>[3]>
): AxiosRequestConfig<InferEndpointDTO<C, E>> & { url: string } => {
  const method = controller.endpoints[endpoint as string].method;
  return {
    url: getEndpointPath(host, controller, endpoint, options?.params),
    method: EndpointMethod[method || EndpointMethod.GET],
    ...options?.config,
  };
};
