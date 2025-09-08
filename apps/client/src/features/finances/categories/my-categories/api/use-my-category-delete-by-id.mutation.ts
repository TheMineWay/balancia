import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { CategoryModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyCategoryDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (categoryId: CategoryModel["id"]) =>
			endpointMutation(
				MY_CATEGORY_CONTROLLER,
				"deleteCategory",
				{ id: categoryId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CATEGORY_CONTROLLER, {})],
			});
		},
	});
};
