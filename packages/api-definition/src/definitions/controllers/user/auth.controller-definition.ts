import { USER_SCHEMA } from "@shared/models";
import { object, string, z } from "zod";
import { ControllerDefinition, EndpointMethod } from "../../../types";

const LOGIN_DTO = z.object({
  code: z.string().nonempty().max(256),
});

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
