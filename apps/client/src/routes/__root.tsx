import { NotFoundStatus } from "@common/extended-ui/status/components/prebuilt/not-found-status";
import { UserActionsAvatar } from "@core/auth/user/components/avatar/user-actions-avatar";
import { ThemeSwitch } from "@core/config/local-config/components/theme/theme-switch";
import { Protected } from "@core/permission/components/protected";
import { NavigationLayout } from "@layouts/navigation/navigation.layout";
import { ActionIcon, Group } from "@mantine/core";
import { useUserInfo } from "@providers/auth/user-info.context";
import { Permission } from "@shared/models";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FaHome } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const MyAvatar: FC = () => {
	const { user } = useUserInfo();
	return <UserActionsAvatar user={user} />;
};

/**
 * Contains links that are visible on the navbar
 */
const Navigator: FC = () => {
	return (
		<Group gap="xs">
			{/* HOME */}
			<Link to="/">
				<ActionIcon variant="outline">
					<FaHome />
				</ActionIcon>
			</Link>

			{/* ADMIN DASHBOARD */}
			<Protected
				condition={{ type: "simple", permissions: [Permission.ADMIN] }}
			>
				<Link to="/sys">
					<ActionIcon variant="outline">
						<MdAdminPanelSettings />
					</ActionIcon>
				</Link>
			</Protected>
		</Group>
	);
};

export const Route = createRootRoute({
	component: () => (
		<>
			<NavigationLayout.Root>
				<NavigationLayout.Navbar>
					<Navigator />
					<div className="flex gap-4 items-center">
						<ThemeSwitch />
						<MyAvatar />
					</div>
				</NavigationLayout.Navbar>
				<NavigationLayout.Content>
					<Outlet />
				</NavigationLayout.Content>
			</NavigationLayout.Root>
			<TanStackRouterDevtools />
		</>
	),
	notFoundComponent: () => (
		<div className="flex items-center justify-center items-center h-full w-full">
			<NotFoundStatus />
		</div>
	),
});
