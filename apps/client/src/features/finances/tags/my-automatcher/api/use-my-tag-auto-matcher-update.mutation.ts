import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { MY_TAG_AUTOMATCHERS_BASE_QUERY_KEY } from "@fts/finances/tags/my-automatcher/api/use-my-tag-auto-matchers-list.query";
import { MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type {
	TagAutomatcherCreateModel,
	TagAutomatcherModel,
} from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTagAutoMatcherUpdateMutation = (
	automatcherId: TagAutomatcherModel["id"],
) => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tagAutomatcher: TagAutomatcherCreateModel) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"updateTagAutoMatch",
				{ autoMatchId: automatcherId.toString() },
				request,
			)({ body: tagAutomatcher }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: MY_TAG_AUTOMATCHERS_BASE_QUERY_KEY(),
			});
		},
	});
};
