import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { getController, MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountCreateModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyAccountCreateMutation = () => {
	const { request } = useAuthenticatedRequest();

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (account: AccountCreateModel) =>
			endpointMutation(
				MY_ACCOUNTS_CONTROLLER,
				"create",
				{},
				request,
			)({ body: account }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getController(MY_ACCOUNTS_CONTROLLER, {})],
			});
		},
	});
};
