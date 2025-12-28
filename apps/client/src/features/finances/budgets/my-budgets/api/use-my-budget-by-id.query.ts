import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_BUDGET_BY_ID_QUERY_KEY: ParametrizedQueryKey<{
	budgetId: BudgetModel["id"];
}> = ({ budgetId }) => [
	getController(MY_BUDGET_CONTROLLER_DEFINITION, {}),
	"budget",
	budgetId,
];

export const useMyBudgetByIdQuery = (budgetId: BudgetModel["id"]) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_BUDGET_CONTROLLER_DEFINITION,
			"get",
			{ budgetId: budgetId.toString() },
			request,
			{},
		),
		queryKey: USE_MY_BUDGET_BY_ID_QUERY_KEY({ budgetId }),
	});
};
