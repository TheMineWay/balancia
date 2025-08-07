import { Permission, ROLE_SCHEMA, USER_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const CHECK_IN_ENDPOINT = {
  getPath: () => ["check-in"],
  paramsMapping: {},
  method: EndpointMethod.POST,
} satisfies EndpointDefinition;

const MY_INFO_ENDPOINT = {
  getPath: () => ["my-info"],
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({
    user: USER_SCHEMA,
    permissions: z.array(z.enum(Permission)),
    roles: z.array(ROLE_SCHEMA),
  }),
} satisfies EndpointDefinition;

/* Definition */

export const AUTH_CONTROLLER = {
  getPath: () => ["auth"],
  paramsMapping: {},
  endpoints: {
    "check-in": CHECK_IN_ENDPOINT,
    "my-info": MY_INFO_ENDPOINT,
  },
} satisfies ControllerDefinition;
