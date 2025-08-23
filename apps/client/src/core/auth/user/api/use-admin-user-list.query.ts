import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { ADMIN_USER_CONTROLLER } from "@shared/api-definition";
import type { PaginatedQuery, SearchModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

const USE_USERS_LIST_QUERY_KEY: ParametrizedQueryKey<{
	pagination: PaginatedQuery;
	search: SearchModel;
}> = ({ pagination, search }) => ["user", "list", { pagination, search }];

export const useAdminUserListQuery = (
	pagination: UsePagination,
	search: SearchModel,
) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				ADMIN_USER_CONTROLLER,
				"list",
				{},
				request,
				{
					query: {
						pagination: pagination.requestData,
						search,
					},
				},
			)();

			pagination.setTotal(response.total);

			return {
				users: response.items,
				total: response.total,
			};
		},
		queryKey: USE_USERS_LIST_QUERY_KEY({
			pagination: pagination.pagination,
			search,
		}),
	});
};
