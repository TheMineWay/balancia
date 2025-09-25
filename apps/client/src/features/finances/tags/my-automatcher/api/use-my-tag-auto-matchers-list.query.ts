import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type {
	ParametrizedQueryKey,
	QueryKey,
} from "@core/requests/types/query-key.type";
import type { UseSearch } from "@core/search/hooks/use-search";
import { MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { AutoAssignMetadataModel, TagModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const MY_TAG_AUTOMATCHERS_BASE_QUERY_KEY: QueryKey = () => [
	"my-tag-auto-matchers",
];
export const USE_MY_TAG_AUTO_MATCHERS_QUERY_KEY: ParametrizedQueryKey<{
	tagId: TagModel["id"];
}> = (options) => [...MY_TAG_AUTOMATCHERS_BASE_QUERY_KEY(), options.tagId];

type Options = {
	tagId: TagModel["id"];
	search: UseSearch<AutoAssignMetadataModel>;
	pagination: UsePagination;
};

export const useMyTagAutoMatchersListQuery = ({
	tagId,
	pagination,
	search,
}: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_TAGS_CONTROLLER,
			"getTagAutoMatchsList",
			{ tagId: tagId.toString() },
			request,
			{ query: { pagination: pagination.requestData, ...search.requestData } },
		),
		queryKey: USE_MY_TAG_AUTO_MATCHERS_QUERY_KEY({ tagId }),
	});
};
