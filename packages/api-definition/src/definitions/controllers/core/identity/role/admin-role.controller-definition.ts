import { Role } from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

export const ADMIN_ROLE_CONTROLLER_DEFINITION = {
  getName: () => "admin-role",
  endpoints: {
    // Roles
    create: {
      getPath: () => "create",
      method: EndpointMethod.POST,
    },
    update: {
      getPath: (options) => `update/${options.roleId}`,
      getDefinitionPath: () => ({ roleId: "roleId" }),
      method: EndpointMethod.PUT,
    } satisfies EndpointDefinition<{ roleId: Role["id"] }>,
    delete: {
      getPath: (options) => `delete/${options.roleId}`,
      getDefinitionPath: () => ({ roleId: "roleId" }),
      method: EndpointMethod.DELETE,
    } satisfies EndpointDefinition<{ roleId: Role["id"] }>,
  },
} as const satisfies ControllerDefinition;
