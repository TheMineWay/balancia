import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { MY_TAG_AUTOMATCHERS_BASE_QUERY_KEY } from "@fts/finances/tags/my-automatcher/api/use-my-tag-auto-matchers-list.query";
import { MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagAutomatcherModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyAutoMatcherDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (automatcherId: TagAutomatcherModel["id"]) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"removeTagAutoMatch",
				{ autoMatchId: automatcherId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: MY_TAG_AUTOMATCHERS_BASE_QUERY_KEY(),
			});
		},
	});
};
