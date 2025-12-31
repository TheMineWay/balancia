import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type {
	BudgetSegmentImputationCreateModel,
	BudgetSegmentImputationModel,
} from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
	data: BudgetSegmentImputationCreateModel;
	imputationId: BudgetSegmentImputationModel["id"];
};

export const useMyBudgetSegmentImputationImputeMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ data, imputationId }: Options) =>
			await endpointMutation(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"updateImputation",
				{ id: imputationId.toString() },
				request,
			)({ body: data }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {})],
			});
		},
	});
};
