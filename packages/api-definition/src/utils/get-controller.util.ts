import { ControllerDefinition } from "../types";

export const getController = <T extends ControllerDefinition>(
  controller: T,
  params?: Parameters<T["getName"]>[0]
) => {
  return controller.getName(params);
};
