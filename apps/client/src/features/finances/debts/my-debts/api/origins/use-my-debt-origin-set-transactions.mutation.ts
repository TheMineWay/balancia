import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import type { DebtModel } from "@shared/models";
import { useMutation } from "@tanstack/react-query";

type Options = {
	debtId: DebtModel["id"];
	transactions: { id: number; amount: number }[];
};

export const useMyDebtOriginSetTransactionsMutation = () => {
	const { request } = useAuthenticatedRequest();

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
	});
};
