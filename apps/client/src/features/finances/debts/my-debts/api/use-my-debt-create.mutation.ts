import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { MY_DEBTS_BASE_QUERY_KEY } from "@fts/finances/debts/my-debts/api/use-my-debts.query";
import { MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import type { DebtCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyDebtCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Omit<DebtCreateModel, "userId">) =>
			endpointMutation(
				MY_DEBTS_CONTROLLER,
				"createDebt",
				{ body: data },
				request,
			)({ body: data }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [MY_DEBTS_BASE_QUERY_KEY],
			});
		},
	});
};
