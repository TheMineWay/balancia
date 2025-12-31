import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetSegmentCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyBudgetSegmentCreateMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (segment: BudgetSegmentCreateModel) =>
			endpointMutation(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"create",
				{},
				request,
			)({ body: segment }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
