import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CONTACTS_CONTROLLER } from "@shared/api-definition";
import type { ContactCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyContactsBulkCreateMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (contacts: ContactCreateModel[]) =>
			endpointMutation(
				MY_CONTACTS_CONTROLLER,
				"bulkCreateContacts",
				{},
				request,
			)({ body: { contacts } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CONTACTS_CONTROLLER, {})],
			});
		},
	});
};
