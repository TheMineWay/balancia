import { useRequest } from "@core/hooks/utils/api/use-request.util";
import { endpointMutation } from "@core/utils/request/endpoint-mutation.util";
import { CONTROLLERS } from "@shared/api-definition";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const { request } = useRequest();

  return useMutation({
    mutationFn: endpointMutation(CONTROLLERS.auth, "login", request),
  });
};
