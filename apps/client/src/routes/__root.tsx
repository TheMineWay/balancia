import { UserActionsAvatar } from "@core/auth/user/components/avatar/user-actions-avatar";
import { NavigationLayout } from "@layouts/navigation/navigation.layout";
import { ActionIcon } from "@mantine/core";
import { useUserInfo } from "@providers/auth/user-info.context";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FaHome } from "react-icons/fa";

const MyAvatar: FC = () => {
	const { user } = useUserInfo();
	return <UserActionsAvatar user={user} />;
};

/**
 * Contains links that are visible on the navbar
 */
const Navigator: FC = () => {
	return (
		<Link to="/">
			<ActionIcon variant="outline">
				<FaHome/>
			</ActionIcon>
		</Link>
	);
};

export const Route = createRootRoute({
	component: () => (
		<main>
			<NavigationLayout.Root>
				<NavigationLayout.Navbar>
					<Navigator />
					<MyAvatar />
				</NavigationLayout.Navbar>
				<NavigationLayout.Content>
					<Outlet />
				</NavigationLayout.Content>
			</NavigationLayout.Root>
			<TanStackRouterDevtools />
		</main>
	),
});
