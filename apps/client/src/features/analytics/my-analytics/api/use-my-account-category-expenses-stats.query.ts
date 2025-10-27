import type { DateRange } from "@common/extended-ui/date/hooks/use-date-range";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import { MAX_STATS_MONTH_DATE_DIFF } from "@shared/constants";
import type { AccountModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { useMemo } from "react";

const GET_MY_ACCOUNT_CATEGORY_EXPENSES_STATS_QUERY_KEY: ParametrizedQueryKey<{
	id: AccountModel["id"];
	range?: DateRange | null;
}> = (params) => [
	"my-account-category-expenses-stats",
	params.id,
	{ range: params.range ?? null },
];

type Options = {
	range?: DateRange | null;
};

export const useMyAccountCategoryExpensesStats = (
	accountId: AccountModel["id"],
	{ range }: Options = {},
) => {
	const { request } = useAuthenticatedRequest();

	const rangeFilter = useMemo(() => {
		if (range?.from && range.to)
			return {
				from: range.from,
				to: range.to,
			};

		return {
			from: subMonths(new Date(), MAX_STATS_MONTH_DATE_DIFF),
			to: new Date(),
		};
	}, [range]);

	return useQuery({
		queryFn: endpointQuery(
			MY_ACCOUNTS_CONTROLLER,
			"getCategoryExpensesStats",
			{
				id: accountId.toString(),
			},
			request,
			{
				query: rangeFilter,
			},
		),
		queryKey: GET_MY_ACCOUNT_CATEGORY_EXPENSES_STATS_QUERY_KEY({
			id: accountId,
			range: rangeFilter,
		}),
	});
};
