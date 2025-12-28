import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type {
	BudgetSegmentCreateModel,
	BudgetSegmentModel,
} from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetSegmentUpdateMutation = (
	segmentId: BudgetSegmentModel["id"],
) => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (segmentInfo: Omit<BudgetSegmentCreateModel, "budgetId">) =>
			endpointMutation(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"update",
				{
					segmentId: segmentId.toString(),
				},
				request,
			)({ body: segmentInfo }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
