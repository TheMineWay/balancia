import { USER_SCHEMA } from "@shared/models";
import { z } from "zod";
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
      responseDto: z.object({
        token: z.string(),
        user: USER_SCHEMA,
      }),
    },
  },
} as const satisfies ControllerDefinition;
