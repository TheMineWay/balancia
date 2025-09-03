import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountCreateModel, AccountModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyAccountUpdateMutation = (accountId: AccountModel["id"]) => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (accountInfo: AccountCreateModel) =>
			endpointMutation(
				MY_ACCOUNTS_CONTROLLER,
				"update",
				{
					id: accountId.toString(),
				},
				request,
			)({ body: accountInfo }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_ACCOUNTS_CONTROLLER, {})],
			});
		},
	});
};
