import { USER_MODEL_VALUES, USER_SCHEMA } from "@shared/models";
import { z } from "zod";
import { ControllerDefinition, EndpointMethod } from "../../../types";

/* DTOs */

const UPDATE_PASSWORD_DTO = z.object({
  currentPassword: z
    .string()
    .min(USER_MODEL_VALUES.password.minLength)
    .max(USER_MODEL_VALUES.password.maxLength),
  password: z
    .string()
    .min(USER_MODEL_VALUES.password.minLength)
    .max(USER_MODEL_VALUES.password.maxLength),
});

const UPDATE_MY_PROFILE_NAME_DTO = USER_SCHEMA.pick({
  name: true,
  lastName: true,
});

/* Controller */

export const USER_PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "user-profile",
  endpoints: {
    get: {
      getPath: () => "",
      dto: USER_SCHEMA,
      responseDto: USER_SCHEMA,
    },
    update: {
      getPath: () => "update",
      method: EndpointMethod.PUT,
      dto: UPDATE_MY_PROFILE_NAME_DTO,
    },
    updatePassword: {
      getPath: () => "update-password",
      method: EndpointMethod.PATCH,
      dto: UPDATE_PASSWORD_DTO,
    },
  },
} as const satisfies ControllerDefinition;
