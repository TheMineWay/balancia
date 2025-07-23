import { ROLE_EDITABLE_PROPS_SCHEMA, ROLE_SCHEMA } from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET_ENDPOINT = {
  getPath: () => [],
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({ roles: z.array(ROLE_SCHEMA) }),
} satisfies EndpointDefinition;

const CREATE_ENDPOINT = {
  getPath: () => [],
  paramsMapping: {},
  method: EndpointMethod.POST,
  bodyDto: ROLE_EDITABLE_PROPS_SCHEMA,
} satisfies EndpointDefinition;

const UPDATE_ENDPOINT = {
  getPath: (params) => [params.roleId],
  paramsMapping: { roleId: "roleId" },
  method: EndpointMethod.PUT,
  bodyDto: ROLE_EDITABLE_PROPS_SCHEMA,
} satisfies EndpointDefinition<{ roleId: string }>;

const DELETE_ENDPOINT = {
  getPath: (params) => [params.roleId],
  paramsMapping: { roleId: "roleId" },
  method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ roleId: string }>;

const GET_WITH_STATISTICS_ENDPOINT = {
  getPath: () => ["with-statistics"],
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({
    roles: z.array(
      ROLE_SCHEMA.extend({
        permissionsCount: z.number(),
        usersCount: z.number(),
      })
    ),
  }),
} satisfies EndpointDefinition;

/* Definition */

export const ADMIN_ROLE_CONTROLLER = {
  getPath: () => ["admin-role"],
  paramsMapping: {},
  endpoints: {
    // Basic CRUD
    get: GET_ENDPOINT,
    create: CREATE_ENDPOINT,
    update: UPDATE_ENDPOINT,
    delete: DELETE_ENDPOINT,

    // Extended
    "get-with-statistics": GET_WITH_STATISTICS_ENDPOINT,
  },
} satisfies ControllerDefinition;
