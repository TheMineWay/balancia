import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import type { RequestOptions as ReqOptions} from "@core/hooks/utils/api/use-request.util";
import { useRequest } from "@core/hooks/utils/api/use-request.util";

type RequestOptions = ReqOptions;

export const useAuthenticatedRequest = () => {
    const { request: req } = useRequest();
    const { activeUser: { token } } = useActiveAuth();

    const request = async (options: RequestOptions) => await req({
        ...options,
        headers: {
            authorization: `Bearer ${token}`,
            ...options.headers,
        }
    });

    return { request }
}