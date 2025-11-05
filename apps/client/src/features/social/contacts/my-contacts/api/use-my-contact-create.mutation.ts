import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_CONTACTS_CONTROLLER } from "@shared/api-definition";
import type { ContactCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyContactCreateMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (contact: ContactCreateModel) =>
			endpointMutation(
				MY_CONTACTS_CONTROLLER,
				"createContact",
				{},
				request,
			)({ body: contact }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_CONTACTS_CONTROLLER, {})],
			});
		},
	});
};
