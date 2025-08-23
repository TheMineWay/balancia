import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { getOidcUserManager } from "@core/auth/session/lib/oidc/oidc.manager";
import {
	type OidcContextInfo,
	oidcContext,
} from "@providers/auth/oidc.context";
import { useMemo } from "react";

export const OidcProvider: FC<WithChildren> = ({ children }) => {
	const value: OidcContextInfo = useMemo(
		() => ({
			manager: getOidcUserManager(),
		}),
		[],
	);

	return <oidcContext.Provider value={value}>{children}</oidcContext.Provider>;
};
