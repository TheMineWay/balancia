import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CONTACTS_CONTROLLER } from "@shared/api-definition";
import type { ContactCreateModel, ContactModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyContactUpdateMutation = (contactId: ContactModel["id"]) => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (contactInfo: ContactCreateModel) =>
			endpointMutation(
				MY_CONTACTS_CONTROLLER,
				"updateContact",
				{
					id: contactId.toString(),
				},
				request,
			)({ body: contactInfo }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CONTACTS_CONTROLLER, {})],
			});
		},
	});
};
