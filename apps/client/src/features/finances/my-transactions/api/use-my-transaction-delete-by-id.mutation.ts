import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { MY_TRANSACTIONS_BASE_QUERY_KEY } from "@fts/finances/my-transactions/api/my-transactions.base-query-key";
import { MY_TRANSACTION_CONTROLLER } from "@shared/api-definition";
import { TransactionModel } from "@shared/models";
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
				queryKey: MY_TRANSACTIONS_BASE_QUERY_KEY,
			});
		},
	});
};
