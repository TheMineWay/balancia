import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetSegmentModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetSegmentDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (segmentId: BudgetSegmentModel["id"]) =>
			endpointMutation(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"delete",
				{
					segmentId: segmentId.toString(),
				},
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
