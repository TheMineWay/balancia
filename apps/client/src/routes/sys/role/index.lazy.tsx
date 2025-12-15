import { RoleManager } from "@core/admin/role/manager/components/manager/role-manager";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys/role/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RoleManager />;
}
