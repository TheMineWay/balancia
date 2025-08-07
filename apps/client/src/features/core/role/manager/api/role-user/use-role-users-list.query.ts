import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@common/core/requests/types/query-key.type";
import type { UsePagination } from "@common/hooks/use-pagination";
import { ADMIN_ROLE_CONTROLLER, getController } from "@shared/api-definition";
import type { PaginatedQuery, RoleModel, SearchModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const ROLE_USERS_LIST_QUERY_KEY: ParametrizedQueryKey<{
  roleId: string;
  pagination: PaginatedQuery;
  search: SearchModel;
}> = ({ roleId, pagination, search }) => [
  getController(ADMIN_ROLE_CONTROLLER, {}),
  "role",
  roleId,
  "users-list",
  { pagination, search },
];

export const useRoleUsersListQuery = (
  roleId: RoleModel["id"],
  { requestData, setTotal }: UsePagination,
  search: SearchModel
) => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryFn: async () => {
      const response = await endpointQuery(
        ADMIN_ROLE_CONTROLLER,
        "role-users",
        { roleId: roleId.toString() },
        request,
        { query: { pagination: requestData, search } }
      )();

      setTotal(response.total);

      return response;
    },
    queryKey: ROLE_USERS_LIST_QUERY_KEY({
      roleId: roleId.toString(),
      pagination: requestData,
      search,
    }),
  });
};
