import { useOidc } from "@providers/auth/oidc.context";
import { fromUnixTime, isAfter } from "date-fns";
import type { User } from "oidc-client-ts";
import { useEffect, useMemo, useState } from "react";

export const useOidcState = () => {
	const { manager } = useOidc();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		manager
			.getUser()
			.then(setUser)
			.catch(() => setUser(null));
	}, [manager]);

	const token = user?.access_token;

	const isTokenExpired = useMemo(() => {
		if (!user?.expires_at) return false;

		return !isAfter(fromUnixTime(user.expires_at), new Date());
	}, [user]);

	return {
		token,
		user,
		isTokenExpired,
		manager,
	};
};
