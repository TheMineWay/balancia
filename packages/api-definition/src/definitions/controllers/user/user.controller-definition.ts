import { USER_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";

/* DTOs */

export const USER_CONTROLLER_DEFINITION = {
  getName: () => "user",
  endpoints: {
    get: {
      getPath: () => "",
      responseDto: USER_SCHEMA,
    },
  },
} as const satisfies ControllerDefinition;
