import { UserActionsAvatar } from "@core/auth/user/components/avatar/user-actions-avatar";
import { ThemeSwitch } from "@core/config/local-config/components/theme/theme-switch";
import { Protected } from "@core/permission/components/protected";
import { useTranslation } from "@i18n/use-translation";
import { NavigationLayout } from "@layouts/navigation/navigation.layout";
import { ActionIcon, Button, Group, Menu, Text } from "@mantine/core";
import { useUserInfo } from "@providers/auth/user-info.context";
import { Permission } from "@shared/models";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { FaHome } from "react-icons/fa";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";

const MyAvatar: FC = () => {
	const { user } = useUserInfo();
	return <UserActionsAvatar user={user} />;
};

/**
 * Contains links that are visible on the navbar
 */
const Navigator: FC = () => {
	const { t: transactionT } = useTranslation("transaction");

	return (
		<Group gap="xs">
			{/* HOME */}
			<Link to="/">
				<ActionIcon variant="subtle">
					<FaHome />
				</ActionIcon>
			</Link>

			{/* TRANSACTIONS */}
			<Link to="/transactions">
				<Button
					size="compact-sm"
					leftSection={<MdDashboard />}
					variant="subtle"
				>
					{transactionT().nav.Label}
				</Button>
			</Link>

			{/* ADMIN DASHBOARD */}
			<Protected
				condition={{ type: "simple", permissions: [Permission.ADMIN] }}
			>
				<AdminMenu />
			</Protected>
		</Group>
	);
};

/**
 * Contains options shown in the Admin section
 */
const AdminMenu: FC = () => {
	const { t } = useTranslation("admin");

	return (
		<Menu trigger="hover">
			<Menu.Target>
				<Button
					size="compact-sm"
					variant="subtle"
					leftSection={<MdAdminPanelSettings />}
				>
					{t()["nav-actions"].Label}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Link to="/sys">
					<Menu.Item leftSection={<MdDashboard />}>
						<Text>{t()["nav-actions"].children.dashboard.Label}</Text>
					</Menu.Item>
				</Link>
			</Menu.Dropdown>
		</Menu>
	);
};

const DevTools: FC = () => {
	// Only load in development
	if (process.env.NODE_ENV !== "development") {
		return null;
	}

	const TanStackRouterDevtools = lazy(() =>
		import("@tanstack/react-router-devtools").then((module) => ({
			default: module.TanStackRouterDevtools,
		})),
	);

	return (
		<Suspense fallback={null}>
			<TanStackRouterDevtools />
		</Suspense>
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
			<DevTools />
		</>
	),
});
