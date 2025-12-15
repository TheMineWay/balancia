import { MyDebtsDashboard } from "@fts/finances/debts/my-debts/components/dashboard/my-debts-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/debts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyDebtsDashboard />;
}
