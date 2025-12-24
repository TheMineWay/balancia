import { GlobalFastActions } from "@common/layout/global/components/global-fast-actions";
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
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { LuPiggyBank } from "react-icons/lu";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { PiMoneyWavy } from "react-icons/pi";
import { RiFilePaper2Line } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";

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
				<ActionIcon variant="subtle">
					<FaHome />
				</ActionIcon>
			</Link>

			{/* FINANCES */}
			<FinancesMenu />

			{/* SOCIAL */}
			<SocialMenu />

			{/* ADMIN DASHBOARD */}
			<Protected
				condition={{ type: "simple", permissions: [Permission.ADMIN] }}
			>
				<AdminMenu />
			</Protected>
		</Group>
	);
};

const FinancesMenu: FC = () => {
	const { t } = useTranslation("finances");

	return (
		<Menu trigger="hover">
			<Menu.Target>
				<Button
					size="compact-sm"
					variant="subtle"
					leftSection={<MdDashboard />}
				>
					{t().nav.Label}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Link to="/finances/transactions">
					<Menu.Item leftSection={<PiMoneyWavy />} variant="subtle">
						{t().nav.children.transactions.Label}
					</Menu.Item>
				</Link>
				<Link to="/finances/accounts">
					<Menu.Item leftSection={<LuPiggyBank />} variant="subtle">
						{t().nav.children.accounts.Label}
					</Menu.Item>
				</Link>
				<Link to="/finances/categories">
					<Menu.Item leftSection={<FaRegFolder />} variant="subtle">
						{t().nav.children.categories.Label}
					</Menu.Item>
				</Link>
				<Link to="/finances/tags">
					<Menu.Item leftSection={<BiPurchaseTagAlt />} variant="subtle">
						{t().nav.children.tags.Label}
					</Menu.Item>
				</Link>
				<Link to="/finances/debts">
					<Menu.Item leftSection={<RiFilePaper2Line />} variant="subtle">
						{t().nav.children.debts.Label}
					</Menu.Item>
				</Link>
				<Link to="/finances/budgets">
					<Menu.Item leftSection={<BsCardChecklist />} variant="subtle">
						{t().nav.children.budgets.Label}
					</Menu.Item>
				</Link>
			</Menu.Dropdown>
		</Menu>
	);
};

const SocialMenu: FC = () => {
	const { t } = useTranslation("social");

	return (
		<Menu trigger="hover">
			<Menu.Target>
				<Button
					size="compact-sm"
					variant="subtle"
					leftSection={<IoPersonSharp />}
				>
					{t().nav.Label}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Link to="/social/contacts">
					<Menu.Item leftSection={<TiContacts />} variant="subtle">
						{t().nav.children.contacts.Label}
					</Menu.Item>
				</Link>
			</Menu.Dropdown>
		</Menu>
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
			<GlobalFastActions />

			<DevTools />
		</>
	),
});
