import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { ADMIN_ROLES_WITH_STATS_QUERY_KEY } from "@core/role/manager/api/use-admin-roles-with-stats.query";
import { ADMIN_ROLE_CONTROLLER } from "@shared/api-definition";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRoleDeleteMutation = () => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (roleId: number) =>
			await endpointMutation(
				ADMIN_ROLE_CONTROLLER,
				"delete",
				{ roleId: roleId.toString() },
				request,
			)({}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ADMIN_ROLES_WITH_STATS_QUERY_KEY(),
			});
		},
	});
};
