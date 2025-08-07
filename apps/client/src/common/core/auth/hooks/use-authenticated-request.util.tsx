import { useActiveAuth } from "@common/core/auth/hooks/use-active-auth";
import {
  type AdditionalRequestOptions,
  type RequestOptions as ReqOptions,
  useRequest,
} from "@common/core/requests/hooks/use-request.util";

type RequestOptions = ReqOptions;

export const useAuthenticatedRequest = () => {
  const { request: req } = useRequest();
  const { activeUser } = useActiveAuth();

  const request = async (
    options: RequestOptions,
    additional: AdditionalRequestOptions = {}
  ) =>
    await req(
      {
        ...options,
        headers: {
          authorization: `Bearer ${activeUser.accessToken()}`,
          ...options.headers,
        },
      },
      additional
    );

  return { request };
};
