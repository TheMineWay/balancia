import { AdminDashboard } from "@core/admin/dashboard/components/admin-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminDashboard />;
}
