import { useAuthenticatedRequest } from "@core/hooks/utils/api/use-authenticated-request.util";
import { endpointMutation } from "@core/utils/request/endpoint-mutation.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useMutation } from "@tanstack/react-query";

export const useUpdateMyPasswordMutation = () => {
  const { request } = useAuthenticatedRequest();

  return useMutation({
    mutationFn: endpointMutation(
      CONTROLLERS.userProfile,
      "updatePassword",
      request
    ),
  });
};
