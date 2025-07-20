import {
  CREATE_ROLE_SCHEMA,
  Permission,
  ROLE_SCHEMA,
  UPDATE_ROLE_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
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
  bodyDto: CREATE_ROLE_SCHEMA,
} satisfies EndpointDefinition;

const UPDATE_ENDPOINT = {
  getPath: (params) => [params.roleId],
  paramsMapping: { roleId: "roleId" },
  method: EndpointMethod.PUT,
  bodyDto: UPDATE_ROLE_SCHEMA,
} satisfies EndpointDefinition<{ roleId: string }>;

const DELETE_ENDPOINT = {
  getPath: (params) => [params.roleId],
  paramsMapping: { roleId: "roleId" },
  method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ roleId: string }>;

const GET_WITH_PERMISSIONS_ENDPOINT = {
  getPath: () => ["with-permissions"],
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({
    roles: z.array(
      ROLE_SCHEMA.extend({ permissions: z.array(z.enum(Permission)) })
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
    "get-with-permissions": GET_WITH_PERMISSIONS_ENDPOINT,
  },
} satisfies ControllerDefinition;
