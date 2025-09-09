import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagCreateModel, TagModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTagUpdateMutation = (tagId: TagModel["id"]) => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tag: TagCreateModel) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"updateTag",
				{ id: tagId.toString() },
				request,
			)({ body: tag }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_TAGS_CONTROLLER, {})],
			});
		},
	});
};
