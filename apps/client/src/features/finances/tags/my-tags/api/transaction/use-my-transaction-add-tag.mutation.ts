import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { USE_MY_TAGS_BY_TRANSACTION_QUERY_KEY } from "@fts/finances/tags/my-tags/api/transaction/use-my-tags-by-transaction.query";
import { MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagModel, TransactionModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTransactionAddTagMutation = (
	transactionId: TransactionModel["id"],
) => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tagId: TagModel["id"]) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"addTagToTransaction",
				{ transactionId: transactionId.toString(), tagId: tagId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USE_MY_TAGS_BY_TRANSACTION_QUERY_KEY({ transactionId }),
			});
		},
	});
};
