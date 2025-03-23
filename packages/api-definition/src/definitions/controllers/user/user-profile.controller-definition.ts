import { USER_MODEL_VALUES } from "@shared/models";
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

/* Controller */

export const USER_PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "user-profile",
  endpoints: {
    updatePassword: {
      getPath: () => "update-password",
      method: EndpointMethod.PATCH,
      dto: UPDATE_PASSWORD_DTO,
    },
  },
} as const satisfies ControllerDefinition;
