import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import type { UseSearch } from "@core/search/hooks/use-search";
import { getController, MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import type { DebtListModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const GET_MY_DEBTS_LIST_QUERY_KEY: ParametrizedQueryKey<{
	pagination: UsePagination;
	search: UseSearch<DebtListModel>;
}> = ({ pagination, search }) => [
	getController(MY_DEBTS_CONTROLLER, {}),
	{ pagination: pagination.requestData, search: search.requestData },
];

type Options = {
	pagination: UsePagination;
	search: UseSearch<DebtListModel>;
};

export const useMyDebtsListQuery = ({ pagination, search }: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				MY_DEBTS_CONTROLLER,
				"getDebts",
				{},
				request,
				{
					query: { pagination: pagination.requestData, ...search.requestData },
				},
			)();

			pagination.setTotal(response.total);

			return response;
		},
		queryKey: GET_MY_DEBTS_LIST_QUERY_KEY({
			pagination,
			search,
		}),
	});
};
