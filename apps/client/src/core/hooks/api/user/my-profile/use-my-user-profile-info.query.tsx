import { CORE_BASE_QUERY_KEY } from "@core/constants/request/core-base-query-key.constant";
import { useAuthenticatedRequest } from "@core/hooks/utils/api/use-authenticated-request.util";
import type { QueryKey } from "@core/types/base/query/query-key.type";
import { endpointQuery } from "@core/utils/request/endpoint-query.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const MY_USER_PROFILE_INFO_QUERY_KEYS: QueryKey = () => [
  ...CORE_BASE_QUERY_KEY,
  "user-profile",
  "info",
];

export const useMyUserProfileInfoQuery = () => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryKey: MY_USER_PROFILE_INFO_QUERY_KEYS(),
    queryFn: endpointQuery(CONTROLLERS.userProfile, "getInfo", request),
  });
};
