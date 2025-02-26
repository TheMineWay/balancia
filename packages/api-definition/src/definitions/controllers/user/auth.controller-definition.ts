import { CONFIG } from "@shared/constants";
import { USER_MODEL_VALUES, USER_SCHEMA } from "@shared/models";
import { object, string } from "zod";
import { ControllerDefinition, EndpointMethod } from "../../../types";

const LOGIN_DTO = USER_SCHEMA.pick({
  username: true,
}).merge(
  object({
    password: string().min(1).max(USER_MODEL_VALUES.password.maxLength),
    totp: string().min(CONFIG.totp.digits).max(CONFIG.totp.digits).optional(),
  })
);

export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {
    login: {
      method: EndpointMethod.POST,
      getPath: () => "login",
      dto: LOGIN_DTO,
      responseDto: object({
        token: string(),
        user: USER_SCHEMA,
      }),
    },
  },
} as const satisfies ControllerDefinition;
