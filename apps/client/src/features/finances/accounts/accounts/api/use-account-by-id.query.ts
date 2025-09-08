import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { ParametrizedQueryKey } from "@core/requests/types/query-key.type";
import { getController, MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel } from "@shared/models";
import { useQuery } from "@tanstack/react-query";

export const USE_ACCOUNT_BY_ID_QUERY_KEY: ParametrizedQueryKey<{
	accountId: AccountModel["id"];
}> = ({ accountId }) => [
	getController(MY_ACCOUNTS_CONTROLLER, {}),
	"account",
	accountId,
];

export const useAccountByIdQuery = (accountId: AccountModel["id"]) => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			MY_ACCOUNTS_CONTROLLER,
			"get",
			{ id: accountId.toString() },
			request,
			{},
		),
		queryKey: USE_ACCOUNT_BY_ID_QUERY_KEY({ accountId }),
	});
};
