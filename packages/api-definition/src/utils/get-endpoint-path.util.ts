import { ControllerDefinition } from "../types/controller-definition.type";

export const getEndpointPath = <
  C extends ControllerDefinition,
  E extends keyof C["endpoints"],
  EP extends Parameters<C["endpoints"][E]["getPath"]>[0],
  CP extends Parameters<C["getName"]>[0],
>(
  host: string,
  controller: C,
  endpoint: E,
  params?: {
    endpoint: EP;
    controller: CP;
  }
) => {
  return `${host}/${controller.getName(params?.controller)}/${controller.endpoints[endpoint as string].getPath(params?.endpoint)}`;
};
