import { useProtection } from "@core/permission/hooks/use-protection";
import { Permission } from "@shared/models";
import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys")({
	component: RouteComponent,
});

function RouteComponent() {
	useProtection({
		condition: { type: "simple", permissions: [Permission.ADMIN] },
		routeProtection: true,
	});

	return <Outlet />;
}
