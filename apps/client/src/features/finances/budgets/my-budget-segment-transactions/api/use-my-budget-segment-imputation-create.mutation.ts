import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { GET_MY_BUDGET_SEGMENT_IMPUTATIONS_BASE_QUERY_KEY } from "@fts/finances/budgets/my-budget-segment-transactions/api/use-my-budget-segment-imputations-list.query";
import { MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION } from "@shared/api-definition";
import type { BudgetSegmentImputationCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetSegmentImputationCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: BudgetSegmentImputationCreateModel) =>
			await endpointMutation(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"impute",
				{},
				request,
			)({ body: data }),
		onSuccess: ({ segmentId }) => {
			queryClient.invalidateQueries({
				queryKey: GET_MY_BUDGET_SEGMENT_IMPUTATIONS_BASE_QUERY_KEY({
					segmentId,
				}),
			});
		},
	});
};
