import {
  CREATE_ROLE_SCHEMA,
  UPDATE_ROLE_SCHEMA,
  type RoleModel,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

/* Definition */

export const ADMIN_ROLE_CONTROLLER_DEFINITION = {
  getName: () => "admin-role",
  endpoints: {
    // Roles
    create: {
      getPath: () => "",
      method: EndpointMethod.POST,
      dto: CREATE_ROLE_SCHEMA,
    },
    update: {
      getPath: (options) => `${options.roleId}`,
      getDefinitionPath: () => ({ roleId: "roleId" }),
      method: EndpointMethod.PUT,
      dto: UPDATE_ROLE_SCHEMA,
    } satisfies EndpointDefinition<{ roleId: RoleModel["id"] }>,
    delete: {
      getPath: (options) => `${options.roleId}`,
      getDefinitionPath: () => ({ roleId: "roleId" }),
      method: EndpointMethod.DELETE,
    } satisfies EndpointDefinition<{ roleId: RoleModel["id"] }>,
  },
} as const satisfies ControllerDefinition;
