import type { WithChildren } from "@common/types/component/component.types";
import { oidcUserManager } from "@core/auth/session/lib/oidc/oidc.manager";
import {
	type OidcContextInfo,
	oidcContext,
} from "@providers/auth/oidc.context";
import { useMemo } from "react";

const OIDC_MANAGER = oidcUserManager;

export const OidcProvider: FC<WithChildren> = ({ children }) => {
	const value: OidcContextInfo = useMemo(
		() => ({
			manager: OIDC_MANAGER,
		}),
		[],
	);

	return <oidcContext.Provider value={value}>{children}</oidcContext.Provider>;
};
