import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import type { UseSearch } from "@core/search/hooks/use-search";
import { getController, MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { CategoryModel, PaginatedQuery } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_CATEGORIES_QUERY_KEY: ParametrizedQueryKey<{
	pagination: PaginatedQuery;
	search: UseSearch<CategoryModel>;
}> = ({ pagination, search }) => [
	getController(MY_CATEGORY_CONTROLLER, {}),
	"list",
	{ pagination, search: search.requestData },
];

type Options = {
	pagination: UsePagination;
	search: UseSearch<CategoryModel>;
};

export const useMyCategoriesQuery = ({ pagination, search }: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				MY_CATEGORY_CONTROLLER,
				"getCategories",
				{},
				request,
				{
					query: { pagination: pagination.requestData, ...search.requestData },
				},
			)();

			pagination.setTotal(response.total);

			return response;
		},
		queryKey: USE_MY_CATEGORIES_QUERY_KEY({
			pagination: pagination.requestData,
			search,
		}),
	});
};
