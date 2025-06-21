import { ControllerDefinition } from "../../../types";

export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {},
} as const satisfies ControllerDefinition;
