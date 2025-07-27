import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import { ParametrizedQueryKey } from "@common/core/requests/types/query-key.type";
import { UsePagination } from "@common/hooks/use-pagination";
import { ADMIN_ROLE_CONTROLLER } from "@shared/api-definition";
import type { PaginatedQuery, RoleModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const ROLE_USERS_LIST_QUERY_KEY: ParametrizedQueryKey<{
  roleId: string;
  pagination: PaginatedQuery;
}> = ({ roleId, pagination }) => [
  "admin-roles",
  "role",
  roleId,
  "users-list",
  { pagination },
];

export const useRoleUsersListQuery = (
  roleId: RoleModel["id"],
  { requestData, setTotal }: UsePagination
) => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryFn: async () => {
      const response = await endpointQuery(
        ADMIN_ROLE_CONTROLLER,
        "role-users",
        { roleId: roleId.toString() },
        request,
        { query: requestData }
      )();

      setTotal(response.total);

      return response;
    },
    queryKey: ROLE_USERS_LIST_QUERY_KEY({
      roleId: roleId.toString(),
      pagination: requestData,
    }),
  });
};
