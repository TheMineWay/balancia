import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { CategoryCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyCategoryCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (category: CategoryCreateModel) =>
			endpointMutation(
				MY_CATEGORY_CONTROLLER,
				"createCategory",
				{},
				request,
			)({ body: category }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CATEGORY_CONTROLLER, {})],
			});
		},
	});
};
