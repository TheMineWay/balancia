import { useActiveAuth } from "@common/core/auth/hooks/use-active-auth";
import {
  type RequestOptions as ReqOptions,
  useRequest,
} from "src/common/core/requests/hooks/use-request.util";

type RequestOptions = ReqOptions;

export const useAuthenticatedRequest = () => {
  const { request: req } = useRequest();
  const {
    activeUser: { token },
  } = useActiveAuth();

  const request = async (options: RequestOptions) =>
    await req({
      ...options,
      headers: {
        authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

  return { request };
};
