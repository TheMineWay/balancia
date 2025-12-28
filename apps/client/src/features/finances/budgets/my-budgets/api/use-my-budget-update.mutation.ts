import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetCreateModel, BudgetModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetUpdateMutation = (budgetId: BudgetModel["id"]) => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (budgetInfo: Omit<BudgetCreateModel, "userId">) =>
			endpointMutation(
				MY_BUDGET_CONTROLLER_DEFINITION,
				"update",
				{
					budgetId: budgetId.toString(),
				},
				request,
			)({ body: budgetInfo }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
