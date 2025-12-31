import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetSegmentImputationModel } from "@shared/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const GET_MY_BUDGET_SEGMENT_IMPUTATION_STATUS_BY_TRANSACTION_AND_SEGMENT_QUERY_KEY: ParametrizedQueryKey<{
	segmentId: BudgetSegmentImputationModel["segmentId"];
	transactionId: BudgetSegmentImputationModel["transactionId"];
}> = ({ segmentId, transactionId }) => [
	getController(MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION, {}),
	"imputation-status",
	{ segmentId, transactionId },
];

type Options = {
	transactionId: BudgetSegmentImputationModel["transactionId"];
	segmentId: BudgetSegmentImputationModel["segmentId"];
};

export const useMyBudgetSegmentImputationStatusByTransactionAndSegmentQuery = ({
	segmentId,
	transactionId,
}: Options) => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useQuery({
		queryKey:
			GET_MY_BUDGET_SEGMENT_IMPUTATION_STATUS_BY_TRANSACTION_AND_SEGMENT_QUERY_KEY(
				{
					segmentId,
					transactionId,
				},
			),
	});
};
