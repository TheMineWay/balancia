import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import {
	getController,
	MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
} from "@shared/api-definition";
import type { BudgetSegmentImputationModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const GET_MY_TRANSACTION_IMPUTATION_STATUS_BY_SEGMENT_ID_QUERY_KEY: ParametrizedQueryKey<{
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

export const useMyTransactionImputationStatusBySegmentId = ({
	segmentId,
	transactionId,
}: Options) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
			"getAvailabilityStatsByBudgetAndTransaction",
			{
				segmentId: segmentId.toString(),
				transactionId: transactionId.toString(),
			},
			request,
			{},
		),
		queryKey: GET_MY_TRANSACTION_IMPUTATION_STATUS_BY_SEGMENT_ID_QUERY_KEY({
			segmentId,
			transactionId,
		}),
	});
};
