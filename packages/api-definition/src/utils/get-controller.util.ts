import { ControllerDefinition } from "../types";

export const getController = (
  controller: ControllerDefinition,
  params?: Parameters<typeof controller.getName>[0]
) => {
  return controller.getName(params);
};
