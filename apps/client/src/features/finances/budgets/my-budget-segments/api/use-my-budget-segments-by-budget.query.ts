import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_BUDGET_SEGMENTS_BY_BUDGET_QUERY_KEY: ParametrizedQueryKey<{
	budgetId: BudgetModel["id"];
}> = ({ budgetId }) => [
	getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {}),
	"getByBudget",
	{ budgetId },
];

type Options = {
	budgetId: BudgetModel["id"];
};

export const useMyBudgetSegmentsByBudgetQuery = ({ budgetId }: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: async () => {
			const response = await endpointQuery(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"getByBudget",
				{
					budgetId: budgetId.toString(),
				},
				request,
				{},
			)();

			return response;
		},
		queryKey: USE_MY_BUDGET_SEGMENTS_BY_BUDGET_QUERY_KEY({
			budgetId,
		}),
	});
};
