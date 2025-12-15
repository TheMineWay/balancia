import type { UseSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_TRANSACTION_CONTROLLER,
} from "@shared/api-definition";
import type {
	PaginatedQuery,
	SearchModel,
	TransactionModel,
} from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const MY_TRANSACTIONS_QUERY_KEY: ParametrizedQueryKey<{
	pagination: PaginatedQuery;
	filters: Partial<TransactionModel>;
	search?: SearchModel;
}> = ({ pagination, filters, search }) => [
	getController(MY_TRANSACTION_CONTROLLER, {}),
	"list",
	{ pagination, filters, search },
];

type Options = {
	pagination: UsePagination;
	search: UseSearch<TransactionModel>;
};

export const useMyTransactionsQuery = (options: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				MY_TRANSACTION_CONTROLLER,
				"getTransactionsList",
				{},
				request,
				{
					query: {
						...options.pagination.requestData,
						...options.search.requestData,
					},
				},
			)();

			options.pagination.setTotal(response.total);

			return response;
		},
		queryKey: MY_TRANSACTIONS_QUERY_KEY({
			pagination: options.pagination.requestData,
			filters: options.search.filters,
			search: { search: options.search.debouncedSearchManager.debouncedValue },
		}),
	});
};
