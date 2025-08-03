import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@common/core/requests/types/query-key.type";
import { ADMIN_ROLE_CONTROLLER, getController } from "@shared/api-definition";
import type { RoleModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

const USE_ROLE_PERMISSIONS_QUERY_KEY: ParametrizedQueryKey<{
  roleId: RoleModel["id"];
}> = (roleId) => [
  getController(ADMIN_ROLE_CONTROLLER, {}),
  "role",
  roleId,
  "permissions",
];

export const useRolePermissionsQuery = (roleId: RoleModel["id"]) => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryFn: endpointQuery(
      ADMIN_ROLE_CONTROLLER,
      "get-role-permissions",
      {
        roleId: roleId.toString(),
      },
      request,
      {}
    ),
    queryKey: USE_ROLE_PERMISSIONS_QUERY_KEY({ roleId }),
  });
};
