import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetSegmentImputationModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
	imputationId: BudgetSegmentImputationModel["id"];
};

export const useMyBudgetSegmentImputationDeleteMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ imputationId }: Options) =>
			await endpointMutation(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"removeImputation",
				{ id: imputationId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
