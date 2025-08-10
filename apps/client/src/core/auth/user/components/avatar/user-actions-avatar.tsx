import { UserAvatar } from "@core/auth/user/components/avatar/user-avatar";
import type { UserModel } from "@shared/models";

type Props = {
	user: UserModel;
};

export const UserActionsAvatar: FC<Props> = ({ user }) => {
	return <UserAvatar user={user} />;
};
