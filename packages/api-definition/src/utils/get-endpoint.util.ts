import { ControllerDefinition } from "../types";

export const getEndpoint = <
  T extends ControllerDefinition,
  K extends keyof T["endpoints"]
>(
  controller: T,
  endpoint: K
) => {
  return controller.endpoints[endpoint as string];
};
