import { USE_MY_USER_PREFERENCES_QUERY_KEY } from "@common/user/preferences/api/use-my-user-preferences.query";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMyMainAccountSetMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (accountId: AccountModel["id"] | null) =>
			await endpointMutation(
				MY_ACCOUNTS_CONTROLLER,
				"setMainAccount",
				{},
				request,
			)({ body: { accountId } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USE_MY_USER_PREFERENCES_QUERY_KEY(),
			});
		},
	});
};
