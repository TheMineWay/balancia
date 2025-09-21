import { MyTransactionsDashboard } from "@fts/finances/transactions/my-transactions/components/dashboard/my-transactions-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/transactions/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyTransactionsDashboard />;
}
