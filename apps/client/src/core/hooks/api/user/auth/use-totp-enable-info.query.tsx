import { CORE_BASE_QUERY_KEY } from "@core/constants/request/core-base-query-key.constant";
import { useAuthenticatedRequest } from "@core/hooks/utils/api/use-authenticated-request.util";
import type { QueryKey } from "@core/types/base/query/query-key.type";
import { endpointQuery } from "@core/utils/request/endpoint-query.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const USE_TOTP_ENABLE_INFO_QUERY_KEY: QueryKey = () => [
  ...CORE_BASE_QUERY_KEY,
  "user",
  "totp-enable-info",
];

export const useTotpEnableInfoQuery = () => {
  const { request } = useAuthenticatedRequest();

  return useQuery({
    queryKey: USE_TOTP_ENABLE_INFO_QUERY_KEY(),
    queryFn: endpointQuery(CONTROLLERS.user, "getEnable2FaInfo", request),
  });
};
