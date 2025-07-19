import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointMutation } from "@common/core/requests/lib/endpoint-mutation.util";
import { ADMIN_ROLE_CONTROLLER } from "@shared/api-definition";
import { useMutation } from "@tanstack/react-query";

export const useRoleCreateMutation = () => {
  const { request } = useAuthenticatedRequest();
  return useMutation({
    mutationFn: endpointMutation(ADMIN_ROLE_CONTROLLER, "create", {}, request),
  });
};
