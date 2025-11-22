import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { USE_MY_DEBT_ORIGIN_GET_TRANSACTIONS_QUERY_KEY } from "@fts/finances/debts/my-debts/api/origins/use-my-debt-origin-get-transactions.query";
import { MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import type { DebtModel, DebtOriginModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
	debtId: DebtModel["id"];
	transactions: DebtOriginModel[];
};

export const useMyDebtOriginSetTransactionsMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ debtId, transactions }: Options) =>
			endpointMutation(
				MY_DEBTS_CONTROLLER,
				"assignOriginTransactions",
				{ debtId: debtId.toString() },
				request,
			)({
				body: { transactions },
			}),
		onSuccess: (_, { debtId }) => {
			queryClient.invalidateQueries({
				queryKey: USE_MY_DEBT_ORIGIN_GET_TRANSACTIONS_QUERY_KEY({ debtId }),
			});
		},
	});
};
