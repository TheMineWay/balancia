import {
  getPaginatedResponse,
  PAGINATED_SEARCH_SCHEMA,
  ROLE_EDITABLE_PROPS_SCHEMA,
  ROLE_SCHEMA,
  USER_SCHEMA,
} from "@shared/models";
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
  getPath: (params) => ["role", params.roleId],
  paramsMapping: { roleId: "roleId" },
  method: EndpointMethod.PUT,
  bodyDto: ROLE_EDITABLE_PROPS_SCHEMA,
} satisfies EndpointDefinition<{ roleId: string }>;

const DELETE_ENDPOINT = {
  getPath: (params) => ["role", params.roleId],
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

// Role users

const GET_ROLE_USERS_ENDPOINT = {
  getPath: (params) => ["role", params.roleId, "users"],
  paramsMapping: { roleId: "roleId" },
  method: EndpointMethod.GET,
  responseDto: getPaginatedResponse(USER_SCHEMA),
  queryDto: PAGINATED_SEARCH_SCHEMA,
} satisfies EndpointDefinition<{ roleId: string }>;

const ASSIGN_ROLE_ENDPOINT = {
  getPath: (params) => [
    "role",
    params.roleId,
    "user",
    params.userId,
    "assignation",
  ],
  paramsMapping: { roleId: "roleId", userId: "userId" },
  method: EndpointMethod.POST,
} satisfies EndpointDefinition<{ roleId: string; userId: string }>;

const UNASSIGN_ROLE_ENDPOINT = {
  getPath: (params) => [
    "role",
    params.roleId,
    "user",
    params.userId,
    "assignation",
  ],
  paramsMapping: { roleId: "roleId", userId: "userId" },
  method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ roleId: string; userId: string }>;

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
    "role-users": GET_ROLE_USERS_ENDPOINT,
    "assign-role": ASSIGN_ROLE_ENDPOINT,
    "unassign-role": UNASSIGN_ROLE_ENDPOINT,
  },
} satisfies ControllerDefinition;
