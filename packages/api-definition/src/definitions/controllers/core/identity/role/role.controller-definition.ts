import type { ControllerDefinition } from "@ts-types/controller-definition.type";

export const ROLE_CONTROLLER_DEFINITION = {
  getName: () => "role",
  endpoints: {},
} as const satisfies ControllerDefinition;
