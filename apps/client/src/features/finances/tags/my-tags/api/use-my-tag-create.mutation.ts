import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_TAGS_CONTROLLER } from "@shared/api-definition";
import type { TagCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyTagCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (tag: TagCreateModel) =>
			endpointMutation(
				MY_TAGS_CONTROLLER,
				"createTag",
				{},
				request,
			)({ body: tag }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_TAGS_CONTROLLER, {})],
			});
		},
	});
};
