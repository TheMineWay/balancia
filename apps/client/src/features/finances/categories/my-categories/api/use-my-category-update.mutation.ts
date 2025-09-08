import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { CategoryCreateModel, CategoryModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyCategoryUpdateMutation = (
	categoryId: CategoryModel["id"],
) => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (category: CategoryCreateModel) =>
			endpointMutation(
				MY_CATEGORY_CONTROLLER,
				"updateCategory",
				{ id: categoryId.toString() },
				request,
			)({ body: category }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CATEGORY_CONTROLLER, {})],
			});
		},
	});
};
