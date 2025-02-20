import { USER_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "../../../types";

const UPDATE_MY_PROFILE_NAME_DTO = USER_SCHEMA.pick({
  name: true,
  lastName: true
})

export const USER_PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "user-profile",
  endpoints: {
    get: {
      getPath: () => '',
      dto: USER_SCHEMA,
      responseDto: USER_SCHEMA
    },
    update: {
      getPath: () => "update",
      method: "PUT",
      dto: UPDATE_MY_PROFILE_NAME_DTO
    },
    updatePassword: {
      getPath: () => "update-password",
      method: "PATCH",
    },
  },
} as const satisfies ControllerDefinition;
