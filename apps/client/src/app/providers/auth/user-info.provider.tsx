import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { useUserInfoQuery } from "@core/auth/user/api/use-user-info.query";
import { userInfoContext } from "@providers/auth/user-info.context";

export const UserInfoProvider: FC<WithChildren> = ({ children }) => {
	const { data } = useUserInfoQuery();

	if (!data) return null;

	return (
		<userInfoContext.Provider value={data}>{children}</userInfoContext.Provider>
	);
};
