import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetCreateMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (budget: Omit<BudgetCreateModel, "userId">) =>
			endpointMutation(
				MY_BUDGET_CONTROLLER_DEFINITION,
				"create",
				{},
				request,
			)({ body: budget }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
