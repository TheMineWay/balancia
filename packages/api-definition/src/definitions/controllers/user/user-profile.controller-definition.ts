import { USER_PROFILE_INFO_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "../../../types";

/* Controller */

export const USER_PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "user-profile",
  endpoints: {
    getInfo: {
      getPath: () => "info",
      responseDto: USER_PROFILE_INFO_SCHEMA,
    },
  },
} as const satisfies ControllerDefinition;
