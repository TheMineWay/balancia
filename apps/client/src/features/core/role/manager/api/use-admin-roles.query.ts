import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import type { QueryKey } from "@common/core/requests/types/query-key.type";
import { CONTROLLERS } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_ROLES_QUERY_KEY: QueryKey = () => ["admin-roles", "list"];

export const useAdminRolesQuery = () => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryKey: ADMIN_ROLES_QUERY_KEY(),
    queryFn: endpointQuery(CONTROLLERS.adminRole, "get", request),
  });
};
