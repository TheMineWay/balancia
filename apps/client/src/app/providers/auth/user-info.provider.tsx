import type { WithChildren } from "@common/types/component/component.types";
import { useUserInfoQuery } from "@core-fts/auth/user/api/use-user-info.query";
import { userInfoContext } from "@providers/auth/user-info.context";

export const UserInfoProvider: FC<WithChildren> = ({ children }) => {
	const { data } = useUserInfoQuery();

	if (!data) return null;

	return (
		<userInfoContext.Provider value={data}>{children}</userInfoContext.Provider>
	);
};
