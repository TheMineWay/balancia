import { DATE_SCHEMA, USER_MODEL_VALUES, USER_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import { z } from "zod";

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

export const USER_CONTROLLER_DEFINITION = {
  getName: () => "user",
  endpoints: {
    get: {
      getPath: () => "",
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
    getEnable2FaInfo: {
      getPath: () => "enable-2fa",
      responseDto: z.object({
        totpUri: z.string(),
        createdAt: DATE_SCHEMA,
      }),
    },
  },
} as const satisfies ControllerDefinition;
