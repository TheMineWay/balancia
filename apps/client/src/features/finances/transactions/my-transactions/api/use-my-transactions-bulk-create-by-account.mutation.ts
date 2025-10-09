import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_TRANSACTION_CONTROLLER,
} from "@shared/api-definition";
import type { AccountModel, TransactionCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
	accountId: AccountModel["id"];
	transactions: Omit<TransactionCreateModel, "accountId">[];
};

export const useMyTransactionsBulkCreateByAccountMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (options: Options) =>
			endpointMutation(
				MY_TRANSACTION_CONTROLLER,
				"bulkCreateTransactions",
				{ accountId: options.accountId.toString() },
				request,
			)({
				body: {
					transactions: options.transactions,
				},
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_TRANSACTION_CONTROLLER, {})],
			});
		},
	});
};
