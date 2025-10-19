import type { DateRange } from "@common/extended-ui/date/hooks/use-date-range";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";
import { addMonths } from "date-fns";
import { useMemo } from "react";

export const GET_MY_ACCOUNT_MONTHLY_STATS_QUERY_KEY: ParametrizedQueryKey<{
	id: AccountModel["id"];
	range?: DateRange;
}> = (params) => [
	"my-account-monthly-stats",
	params.id,
	{ range: params.range ?? null },
];

type Options = {
	range?: DateRange | null;
};

export const useMyAccountMonthlyStatsQuery = (
	accountId: AccountModel["id"],
	{ range = null }: Options = {},
) => {
	const { request } = useAuthenticatedRequest();

	const rangeFilter = useMemo(() => {
		if (range?.from && range.to)
			return {
				from: range.from,
				to: range.to,
			};

		return {
			from: addMonths(new Date(), -6),
			to: new Date(),
		};
	}, [range]);

	return useQuery({
		queryFn: endpointQuery(
			MY_ACCOUNTS_CONTROLLER,
			"getMonthlyStats",
			{ id: accountId.toString() },
			request,
			{
				query: rangeFilter,
			},
		),
		queryKey: GET_MY_ACCOUNT_MONTHLY_STATS_QUERY_KEY({
			id: accountId,
			range: rangeFilter,
		}),
	});
};
