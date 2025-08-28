import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_TRANSACTION_CONTROLLER,
} from "@shared/api-definition";
import type { TransactionCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTransactionMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (transaction: TransactionCreateModel) =>
			endpointMutation(
				MY_TRANSACTION_CONTROLLER,
				"createTransaction",
				{},
				request,
			)({ body: transaction }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_TRANSACTION_CONTROLLER, {})],
			});
		},
	});
};
