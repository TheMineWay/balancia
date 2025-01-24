import { ControllerDefinition } from "../../types";

export const USER_PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "user-profile",
  endpoints: {
    update: {
      getPath: () => "update",
      method: "PUT",
    },
  },
} as const satisfies ControllerDefinition;
