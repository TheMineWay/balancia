import { MyBudgetsDashboard } from "@fts/finances/budgets/my-budgets/components/dashboard/my-budgets-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/budgets/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyBudgetsDashboard />;
}
