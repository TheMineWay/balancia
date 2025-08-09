import { RoleManager } from "@core/auth/role/manager/components/role-manager";
import { useProtection } from "@core/permission/hooks/use-protection";
import { Permission } from "@shared/models";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys/role/")({
	component: RouteComponent,
});

function RouteComponent() {
	useProtection({
		condition: { type: "simple", permissions: [Permission.ADMIN] },
		routeProtection: true,
	});

	return <RoleManager />;
}
