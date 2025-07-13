import { Role } from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

export const ADMIN_ROLE_CONTROLLER_DEFINITION = {
  getName: () => "admin-role",
  endpoints: {
    // Roles
    create: {
      getPath: () => "",
      method: EndpointMethod.POST,
    },
    update: {
      getPath: (options: { roleId: Role["id"] }) => options.roleId.toString(),
      method: EndpointMethod.PUT,
    },
    delete: {
      getPath: (options: { roleId: Role["id"] }) => options.roleId.toString(),
      method: EndpointMethod.DELETE,
    },
  },
} as const satisfies ControllerDefinition;
