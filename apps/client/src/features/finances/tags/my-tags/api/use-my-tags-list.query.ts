import type { UseSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { getController, MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_TAGS_QUERY_KEY: ParametrizedQueryKey<Options> = (
	options,
) => [
	getController(MY_TAGS_CONTROLLER, {}),
	"list",
	{
		pagination: options.pagination.requestData,
		search: options.search.requestData,
	},
];

type Options = {
	pagination: UsePagination;
	search: UseSearch<TagModel>;
};

export const useMyTagsListQuery = ({ pagination, search }: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(MY_TAGS_CONTROLLER, "getTagsList", {}, request, {
			query: { pagination: pagination.requestData, ...search.requestData },
		}),
		queryKey: USE_MY_TAGS_QUERY_KEY({
			pagination: pagination,
			search,
		}),
	});
};
