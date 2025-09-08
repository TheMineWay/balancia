import { MyCategoriesDashboard } from "@fts/finances/categories/my-categories/components/dashboard/my-categories-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/categories/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyCategoriesDashboard />;
}
