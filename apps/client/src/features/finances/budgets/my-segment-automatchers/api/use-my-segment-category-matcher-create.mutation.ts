import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import type {
	BudgetSegmentCategoryAutoMatcherCreateModel,
	BudgetSegmentCategoryAutoMatcherModel,
} from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMySegmentCategoryMatcherCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();
	return useMutation<
		BudgetSegmentCategoryAutoMatcherModel,
		unknown,
		BudgetSegmentCategoryAutoMatcherCreateModel
	>({
		mutationFn: (body) =>
			endpointMutation(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"createSegmentCategoryMatcher",
				{},
				request,
			)({ body }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_AUTOMATIONS_CONTROLLER, {})],
			});
		},
	});
};
