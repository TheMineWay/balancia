import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import {
	getController,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMySegmentCategoryMatcherDeleteMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			segmentId,
			categoryId,
		}: {
			segmentId: number;
			categoryId: number;
		}) =>
			endpointMutation(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"deleteSegmentCategoryMatcher",
				{ segmentId: segmentId.toString(), categoryId: categoryId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_AUTOMATIONS_CONTROLLER, {})],
			});
		},
	});
};
