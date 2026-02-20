import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import type { BudgetSegmentModel, CategoryModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_SEGMENT_CATEGORY_CAN_BE_ASSIGNED_QUERY_KEY: ParametrizedQueryKey<{
	segmentId: BudgetSegmentModel["id"];
	categoryId: CategoryModel["id"];
}> = ({ segmentId, categoryId }) => [
	getController(MY_BUDGET_AUTOMATIONS_CONTROLLER, {}),
	"segment",
	segmentId,
	"category",
	categoryId,
	"can-assign",
];

export const useMySegmentCategoryCanBeAssignedQuery = ({
	segmentId,
	categoryId,
}: {
	segmentId: BudgetSegmentModel["id"];
	categoryId: CategoryModel["id"];
}) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_BUDGET_AUTOMATIONS_CONTROLLER,
			"checkSegmentCategoryCanBeAssigned",
			{ segmentId: segmentId.toString(), categoryId: categoryId.toString() },
			request,
			{},
		),
		queryKey: USE_MY_SEGMENT_CATEGORY_CAN_BE_ASSIGNED_QUERY_KEY({
			segmentId,
			categoryId,
		}),
	});
};
