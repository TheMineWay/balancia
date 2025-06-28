import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {
    "check-in": {
      getPath: () => "check-in",
      method: EndpointMethod.POST,
    },
  },
} as const satisfies ControllerDefinition;
