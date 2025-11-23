import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { USE_MY_DEBT_PAYMENT_GET_TRANSACTIONS_QUERY_KEY } from "@fts/finances/debts/my-debts/api/payments/use-my-debt-payment-get-transactions.query";
import { MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import type { DebtModel, DebtPaymentCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
	debtId: DebtModel["id"];
	transactions: Omit<DebtPaymentCreateModel, "debtId">[];
};

export const useMyDebtPaymentSetTransactionsMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ debtId, transactions }: Options) =>
			endpointMutation(
				MY_DEBTS_CONTROLLER,
				"assignPaymentTransactions",
				{ debtId: debtId.toString() },
				request,
			)({
				body: { transactions },
			}),
		onSuccess: (_, { debtId }) => {
			queryClient.invalidateQueries({
				queryKey: USE_MY_DEBT_PAYMENT_GET_TRANSACTIONS_QUERY_KEY({ debtId }),
			});
		},
	});
};
