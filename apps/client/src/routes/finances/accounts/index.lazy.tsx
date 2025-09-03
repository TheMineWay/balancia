import { MyAccountsDashboard } from "@fts/finances/my-accounts/components/dashboard/my-accounts-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/accounts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyAccountsDashboard />;
}
