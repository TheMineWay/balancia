import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { USE_MY_TAG_AUTO_MATCHERS_QUERY_KEY } from "@fts/finances/tags/my-automatcher/api/use-my-tag-auto-matchers-list.query";
import { MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagAutomatcherCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTagAutoMatcherCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tagAutomatcher: TagAutomatcherCreateModel) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"addTagAutoMatch",
				{},
				request,
			)({ body: tagAutomatcher }),
		onSuccess: (_, vars) => {
			queryClient.invalidateQueries({
				queryKey: USE_MY_TAG_AUTO_MATCHERS_QUERY_KEY({ tagId: vars.tagId }),
			});
		},
	});
};
