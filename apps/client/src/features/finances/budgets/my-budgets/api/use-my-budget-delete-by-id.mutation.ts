import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (budgetId: BudgetModel["id"]) =>
			endpointMutation(
				MY_BUDGET_CONTROLLER_DEFINITION,
				"delete",
				{
					budgetId: budgetId.toString(),
				},
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
