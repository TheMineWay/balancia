import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_TRANSACTION_CONTROLLER,
} from "@shared/api-definition";
import type { TransactionModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTransactionDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (transactionId: TransactionModel["id"]) =>
			endpointMutation(
				MY_TRANSACTION_CONTROLLER,
				"deleteTransaction",
				{ id: transactionId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_TRANSACTION_CONTROLLER, {})],
			});
		},
	});
};
