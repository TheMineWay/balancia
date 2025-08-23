import { useRequest } from "@core/requests/hooks/use-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { QueryKey } from "@core/requests/types/query-key.type";
import { SERVER_INFO_CONTROLLER } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const USE_SERVER_INFO_QUERY_KEY: QueryKey = () => ["server", "info"];

export const useServerInfoQuery = () => {
	const { request } = useRequest();

	return useQuery({
		queryFn: endpointQuery(
			SERVER_INFO_CONTROLLER,
			"get-server-info",
			{},
			request,
			{},
		),
		queryKey: USE_SERVER_INFO_QUERY_KEY(),
	});
};
