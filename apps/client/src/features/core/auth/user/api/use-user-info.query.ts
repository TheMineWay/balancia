import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import type { QueryKey } from "@common/core/requests/types/query-key.type";
import { ENV } from "@constants/env/env.constant";
import { AUTH_CONTROLLER } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

const USE_USER_INFO_QUERY_KEY: QueryKey = () => ["user-info"];

export const useUserInfoQuery = () => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryKey: USE_USER_INFO_QUERY_KEY(),
    queryFn: endpointQuery(AUTH_CONTROLLER, "my-info", {}, request, {}),
    staleTime: ENV.user.infoStaleTime,
  });
};
