import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyAccountDeleteByIdMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (accountId: AccountModel["id"]) =>
			endpointMutation(
				MY_ACCOUNTS_CONTROLLER,
				"delete",
				{
					id: accountId.toString(),
				},
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_ACCOUNTS_CONTROLLER, {})],
			});
		},
	});
};
