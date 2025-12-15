import type { UseSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { getController, MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel, PaginatedQuery } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_ACCOUNTS_QUERY_KEY: ParametrizedQueryKey<{
	pagination: PaginatedQuery;
	search: UseSearch<AccountModel>;
}> = ({ pagination, search }) => [
	getController(MY_ACCOUNTS_CONTROLLER, {}),
	"list",
	{ pagination, search: search.requestData },
];

type Options = {
	pagination: UsePagination;
	search: UseSearch<AccountModel>;
};

export const useMyAccountsQuery = ({ pagination, search }: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				MY_ACCOUNTS_CONTROLLER,
				"getAccounts",
				{},
				request,
				{
					query: { pagination: pagination.requestData, ...search.requestData },
				},
			)();

			pagination.setTotal(response.total);

			return response;
		},
		queryKey: USE_MY_ACCOUNTS_QUERY_KEY({
			pagination: pagination.requestData,
			search,
		}),
	});
};
