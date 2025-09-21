import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTagDeleteMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tagId: TagModel["id"]) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"deleteTag",
				{ id: tagId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_TAGS_CONTROLLER, {})],
			});
		},
	});
};
