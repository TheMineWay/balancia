import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import type { DebtModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_DEBT_PAYMENT_GET_TRANSACTIONS_QUERY_KEY: ParametrizedQueryKey<{
	debtId: DebtModel["id"];
}> = ({ debtId }) => ["my-debt-payment-get-transactions", debtId];

export const useMyDebtPaymentGetTransactionsQuery = (
	debtId: DebtModel["id"],
) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryKey: USE_MY_DEBT_PAYMENT_GET_TRANSACTIONS_QUERY_KEY({ debtId }),
		queryFn: endpointQuery(
			MY_DEBTS_CONTROLLER,
			"getAssignedPaymentTransactions",
			{ debtId: debtId.toString() },
			request,
			{},
		),
	});
};
