import { ADMIN_ROLES_WITH_STATS_QUERY_KEY } from "@core/admin/role/manager/api/use-admin-roles-with-stats.query";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { ADMIN_ROLE_CONTROLLER } from "@shared/api-definition";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRoleCreateMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: endpointMutation(ADMIN_ROLE_CONTROLLER, "create", {}, request),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ADMIN_ROLES_WITH_STATS_QUERY_KEY(),
			});
		},
	});
};
