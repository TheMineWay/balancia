import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CONTACTS_CONTROLLER } from "@shared/api-definition";
import type { ContactModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyContactDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (contactId: ContactModel["id"]) =>
			endpointMutation(
				MY_CONTACTS_CONTROLLER,
				"deleteContact",
				{
					id: contactId.toString(),
				},
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CONTACTS_CONTROLLER, {})],
			});
		},
	});
};
