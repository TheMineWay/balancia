import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import type { QueryKey } from "@core/requests/types/query-key.type";
import { USER_PREFERENCES_CONTROLLER } from "@shared/api-definition";
import { useQuery } from "@tanstack/react-query";

export const USE_MY_USER_PREFERENCES_QUERY_KEY: QueryKey = () => [
	"user-preferences",
	"me",
];

export const useMyUserPreferencesQuery = () => {
	const { request } = useAuthenticatedRequest();

	return useQuery({
		queryFn: endpointQuery(
			USER_PREFERENCES_CONTROLLER,
			"getMyPreferences",
			{},
			request,
			{},
		),
		queryKey: USE_MY_USER_PREFERENCES_QUERY_KEY(),
	});
};
