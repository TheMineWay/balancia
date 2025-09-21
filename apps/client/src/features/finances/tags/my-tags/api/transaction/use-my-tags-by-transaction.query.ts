import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { getController, MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TransactionModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_TAGS_BY_TRANSACTION_QUERY_KEY: ParametrizedQueryKey<{
	transactionId: TransactionModel["id"];
}> = (options) => [
	getController(MY_TAGS_CONTROLLER, {}),
	"transactions",
	options.transactionId,
];

export const useMyTagsByTransactionQuery = (
	transactionId: TransactionModel["id"],
) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_TAGS_CONTROLLER,
			"getTagsByTransaction",
			{ transactionId: transactionId.toString() },
			request,
			{},
		),
		queryKey: USE_MY_TAGS_BY_TRANSACTION_QUERY_KEY({ transactionId }),
	});
};
