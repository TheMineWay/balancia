import { ControllerDefinition } from "../../types";

export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {
    login: {
      method: "POST",
      getPath: () => "login",
    },
    test: {
      method: "GET",
      getPath: (params: { name: string }) => `test/${params.name}`,
    },
  },
} as const satisfies ControllerDefinition;
