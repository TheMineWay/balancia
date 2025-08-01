import {
  getPaginatedResponse,
  PAGINATED_QUERY_SCHEMA,
  USER_SCHEMA,
} from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import z from "zod";

export const USER_LIST_ENDPOINT = {
  getPath: () => ["list"],
  paramsMapping: {},
  responseDto: getPaginatedResponse(USER_SCHEMA),
  queryDto: z.object({
    search: z.string().optional(),
    ...PAGINATED_QUERY_SCHEMA.shape,
  }),
} satisfies EndpointDefinition;

// Controller

export const ADMIN_USER_CONTROLLER = {
  getPath: () => ["admin-user"],
  paramsMapping: {},
  endpoints: {
    list: USER_LIST_ENDPOINT,
  },
} satisfies ControllerDefinition;
