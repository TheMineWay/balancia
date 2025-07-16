import { useAuthenticatedRequest } from "@common/core/auth/hooks/use-authenticated-request.util";
import { endpointMutation } from "@common/core/requests/lib/endpoint-mutation.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useMutation } from "@tanstack/react-query";

export const useRoleUpdateMutation = () => {
  const { request } = useAuthenticatedRequest();
  return useMutation({
    mutationFn: endpointMutation(CONTROLLERS.adminRole, "update", request),
  });
};
