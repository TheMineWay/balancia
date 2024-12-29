import { ControllerDefinition } from "../../types";

export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {
    login: {
      method: "POST",
      getPath: () => "login",
    },
  },
} as const satisfies ControllerDefinition;
