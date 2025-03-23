import { CORE_BASE_QUERY_KEY } from "@core/constants/request/core-base-query-key.constant";
import { useAuthenticatedRequest } from "@core/hooks/utils/api/use-authenticated-request.util";
import type { QueryKey } from "@core/types/base/query/query-key.type";
import { endpointQuery } from "@core/utils/request/endpoint-query.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const USER_ACCOUNT_INFO_QUERY_KEYS: QueryKey = () => [
  ...CORE_BASE_QUERY_KEY,
  "user",
  "account-info",
];

/**
 * Returns a query object containing user account info.
 *
 * NOTES:
 * - This is used to obtain the data that repopulates the stored user auth context (the user property).
 */
export const useUserAccountInfoQuery = () => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryKey: USER_ACCOUNT_INFO_QUERY_KEYS(),
    queryFn: endpointQuery(CONTROLLERS.user, "get", request),
  });
};
