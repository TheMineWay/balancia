import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetSegmentModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_BUDGET_SEGMENT_BY_ID_QUERY_KEY: ParametrizedQueryKey<{
	segmentId: BudgetSegmentModel["id"];
}> = ({ segmentId }) => [
	getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {}),
	"segment",
	segmentId,
];

export const useMyBudgetSegmentByIdQuery = (
	segmentId: BudgetSegmentModel["id"],
) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
			"get",
			{ segmentId: segmentId.toString() },
			request,
			{},
		),
		queryKey: USE_MY_BUDGET_SEGMENT_BY_ID_QUERY_KEY({ segmentId }),
	});
};
