import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointMutation } from "@common/core/requests/lib/endpoint-mutation.util";
import { ADMIN_ROLE_CONTROLLER, getController } from "@shared/api-definition";
import type { RoleModel, UserModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
  roleId: RoleModel["id"];
  userId: UserModel["id"];
};

export const useRoleUserUnassignMutation = () => {
  const { request } = useAuthenticatedRequest();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, userId }: Options) =>
      await endpointMutation(
        ADMIN_ROLE_CONTROLLER,
        "unassign-role",
        {
          roleId: roleId.toString(),
          userId: userId.toString(),
        },
        request
      )({}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getController(ADMIN_ROLE_CONTROLLER, {})],
      });
    },
  });
};
