import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const GET_MY_ACCOUNT_MONTHLY_STATS_QUERY_KEY: ParametrizedQueryKey<{
	id: AccountModel["id"];
}> = (params) => ["my-account-monthly-stats", params.id];

export const useMyAccountMonthlyStatsQuery = (
	accountId: AccountModel["id"],
) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_ACCOUNTS_CONTROLLER,
			"getMonthlyStats",
			{ id: accountId.toString() },
			request,
			{},
		),
		queryKey: GET_MY_ACCOUNT_MONTHLY_STATS_QUERY_KEY({ id: accountId }),
	});
};
