import { ENV } from "@constants/env/env.constant";
import { useLogout } from "@core/auth/session/hooks/use-logout";
import { UserAvatar } from "@core/auth/user/components/avatar/user-avatar";
import { useTranslation } from "@i18n/use-translation";
import {
	ActionIcon,
	Drawer,
	Group,
	Loader,
	LoadingOverlay,
	Menu,
	Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { UserModel } from "@shared/models";
import { lazy, Suspense } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaGear, FaUser } from "react-icons/fa6";

/**
 * Lazy load to reduce active app size in memory. It only gets loaded if it needs to be used.
 */
const LocalConfigManager = lazy(() =>
	import("@core/config/local-config/components/local-config-manager").then(
		(module) => ({
			default: module.LocalConfigManager,
		}),
	),
);

type Props = {
	user: UserModel;
};

/**
 * User actions avatar component that displays a clickable user avatar with dropdown menu.
 * Provides access to profile, settings, and logout functionality.
 * Lazy loads the local config manager to optimize bundle size.
 */
export const UserActionsAvatar: FC<Props> = ({ user }) => {
	const { t } = useTranslation("auth");
	const { t: commonT } = useTranslation("common");

	const [
		isLocalConfigOpened,
		{ open: openLocalConfig, close: closeLocalConfig },
	] = useDisclosure();

	const { logout, isLoggingOut } = useLogout();

	return (
		<>
			<Menu>
				<Menu.Target>
					<ActionIcon size="xl" variant="transparent">
						<UserAvatar user={user} />
					</ActionIcon>
				</Menu.Target>

				<Menu.Dropdown>
					{/* Profile */}
					{ENV.auth.profileUrl && (
						<a target="_blank" href={ENV.auth.profileUrl}>
							<Menu.Item leftSection={<FaUser />}>
								{commonT().expressions.Profile}
							</Menu.Item>
						</a>
					)}

					{/* Local config */}
					<Menu.Item leftSection={<FaGear />} onClick={openLocalConfig}>
						{commonT().components["local-config"].Title}
					</Menu.Item>

					{/* Auth actions */}
					<Menu.Item
						color="red"
						leftSection={isLoggingOut ? <Loader size="sm" /> : <FaSignOutAlt />}
						onClick={() => logout()}
					>
						{t().actions.Logout}
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>

			{/* LOCAL CONFIG */}
			<Drawer
				position="right"
				title={
					<Group gap="xs">
						<FaGear />
						<Text>{commonT().components["local-config"].Title}</Text>
					</Group>
				}
				opened={isLocalConfigOpened}
				onClose={closeLocalConfig}
			>
				<Suspense fallback={<LoadingOverlay visible />}>
					<LocalConfigManager />
				</Suspense>
			</Drawer>
		</>
	);
};
