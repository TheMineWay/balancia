import { useLogout } from "@core/auth/session/hooks/use-logout";
import { UserAvatar } from "@core/auth/user/components/avatar/user-avatar";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Loader, Menu } from "@mantine/core";
import type { UserModel } from "@shared/models";
import { BiLogOut } from "react-icons/bi";

type Props = {
	user: UserModel;
};

export const UserActionsAvatar: FC<Props> = ({ user }) => {
	const { t } = useTranslation("auth");
	const { logout, isLoggingOut } = useLogout();

	return (
		<Menu>
			<Menu.Target>
				<ActionIcon size="xl" variant="transparent">
					<UserAvatar user={user} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					color="red"
					leftSection={isLoggingOut ? <Loader size="sm" /> : <BiLogOut />}
					onClick={() => logout()}
				>
					{t().actions.Logout}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
