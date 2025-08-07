import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointQuery } from "@common/core/requests/lib/endpoint-query.util";
import type { QueryKey } from "@common/core/requests/types/query-key.type";
import { ADMIN_ROLE_CONTROLLER, getController } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_ROLES_WITH_STATS_QUERY_KEY: QueryKey = () => [
	getController(ADMIN_ROLE_CONTROLLER, {}),
	"list-with-statistics",
];

export const useAdminRolesWithStatsQuery = () => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryKey: ADMIN_ROLES_WITH_STATS_QUERY_KEY(),
		queryFn: endpointQuery(
			ADMIN_ROLE_CONTROLLER,
			"get-with-statistics",
			{},
			request,
			{},
		),
	});
};
