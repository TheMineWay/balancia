import { useActiveAuth } from "@core/auth/session/hooks/use-active-auth";
import {
	type AdditionalRequestOptions,
	type RequestOptions as ReqOptions,
	useRequest,
} from "@core/requests/hooks/use-request.util";

type RequestOptions = ReqOptions;

export const useAuthenticatedRequest = () => {
	const { request: req } = useRequest();
	const { activeUser } = useActiveAuth();

	const request = async (
		options: RequestOptions,
		additional: AdditionalRequestOptions = {},
	) =>
		await req(
			{
				...options,
				headers: {
					authorization: `Bearer ${activeUser.accessToken()}`,
					...options.headers,
				},
			},
			additional,
		);

	return { request };
};
