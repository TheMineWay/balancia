import { useAuthenticatedRequest } from "@common/core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@common/core/requests/lib/endpoint-mutation.util";
import { USE_ROLE_PERMISSIONS_QUERY_KEY } from "@core-fts/role/manager/api/role-permission/use-role-permissions.query";
import { ADMIN_ROLE_CONTROLLER } from "@shared/api-definition";
import type { RoleModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRolePermissionsSetMutation = (roleId: RoleModel["id"]) => {
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: endpointMutation(
			ADMIN_ROLE_CONTROLLER,
			"set-role-permissions",
			{
				roleId: roleId.toString(),
			},
			request,
		),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: USE_ROLE_PERMISSIONS_QUERY_KEY({ roleId }),
			});
		},
	});
};
