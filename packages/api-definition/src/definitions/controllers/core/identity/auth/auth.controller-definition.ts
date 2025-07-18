import { EndpointMethod } from "@/v3/types/endpoint-method.enum";
import { ControllerDefinition } from "@ts-types/controller-definition.type";

export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {
    "check-in": {
      getPath: () => "check-in",
      method: EndpointMethod.POST,
    },
  },
} as const satisfies ControllerDefinition;
