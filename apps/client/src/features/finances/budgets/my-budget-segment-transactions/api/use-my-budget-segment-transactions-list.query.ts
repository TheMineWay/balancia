import type { UseSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type {
	BudgetSegmentModel,
	TransactionFiltersModel,
} from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const GET_MY_BUDGET_SEGMENT_TRANSACTIONS_QUERY_KEY: ParametrizedQueryKey<{
	segmentId: BudgetSegmentModel["id"];
	search: UseSearch<TransactionFiltersModel>;
	pagination: UsePagination;
}> = ({ segmentId, search, pagination }) => [
	getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {}),
	"segment",
	segmentId,
	"transactions-list",
	{ search: search.requestData, pagination: pagination.requestData },
];

type Options = {
	segmentId: BudgetSegmentModel["id"];
	pagination: UsePagination;
	search: UseSearch<TransactionFiltersModel>;
};

export const useMyBudgetSegmentTransactionsListQuery = ({
	segmentId,
	pagination,
	search,
}: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"listTransactions",
				{ segmentId: segmentId.toString() },
				request,
				{
					query: {
						pagination: pagination.requestData,
						...search.requestData,
					},
				},
			)();

			pagination.setTotal(response.total);

			return response;
		},
		queryKey: GET_MY_BUDGET_SEGMENT_TRANSACTIONS_QUERY_KEY({
			segmentId,
			search,
			pagination,
		}),
	});
};
