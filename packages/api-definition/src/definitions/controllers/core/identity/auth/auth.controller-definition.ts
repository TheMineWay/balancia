import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

const CHECK_IN_ENDPOINT = {
  getPath: () => ["check-in"],
  paramsMapping: {},
  method: EndpointMethod.POST,
} satisfies EndpointDefinition;

export const AUTH_CONTROLLER_DEFINITION = {
  getPath: () => ["auth"],
  paramsMapping: {},
  endpoints: {
    "check-in": CHECK_IN_ENDPOINT,
  },
} satisfies ControllerDefinition;
