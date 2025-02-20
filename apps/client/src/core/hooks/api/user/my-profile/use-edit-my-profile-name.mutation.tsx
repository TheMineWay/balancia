import { USER_ACCOUNT_INFO_QUERY_KEYS } from "@core/hooks/api/user/use-user-account-info.query";
import { useAuthenticatedRequest } from "@core/hooks/utils/api/use-authenticated-request.util";
import { endpointMutation } from "@core/utils/request/endpoint-mutation.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditMyProfileNameMutation = () => {
  const { request } = useAuthenticatedRequest();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: endpointMutation(CONTROLLERS.userProfile, "update", request),
    onSuccess: () => {
      // As user profile info has been updated, invalidate user account info query
      queryClient.invalidateQueries({
        queryKey: USER_ACCOUNT_INFO_QUERY_KEYS(),
      });
    },
  });
};
