import type { UseSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import {
	getController,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import type { CategoryModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const useMySegmentCategoryMatchersQueryList = ({
	segmentId,
	pagination,
	search,
}: {
	segmentId: number;
	pagination: UsePagination;
	search: UseSearch<CategoryModel>; // Is category as it filters by category fields
}) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryKey: [
			getController(MY_BUDGET_AUTOMATIONS_CONTROLLER, {}),
			"segment",
			segmentId,
			"category-matchers",
			{ pagination, search },
		],
		queryFn: async () => {
			return endpointQuery(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"getSegmentCategoryMatchersList",
				{ segmentId: segmentId.toString() },
				request,
				{
					query: {
						pagination: pagination.requestData,
						search: search.requestData.search,
					},
				},
			)();
		},
	});
};
