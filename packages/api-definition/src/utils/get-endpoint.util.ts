import { ControllerDefinition } from "../types";

export const getEndpoint = <
  T extends ControllerDefinition,
  K extends keyof T["endpoints"],
>(
  controller: T,
  endpoint: K,
  params?: T["endpoints"][K]["getPath"] extends (arg: infer P) => any
    ? P
    : never
) => {
  return controller.endpoints[endpoint as string].getPath(
    params as T["endpoints"][K]["getPath"] extends (arg: infer P) => any
      ? P
      : undefined
  );
};
