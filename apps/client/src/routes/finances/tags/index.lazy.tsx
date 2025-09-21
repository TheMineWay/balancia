import { MyTagsDashboard } from "@fts/finances/tags/my-tags/components/dashboard/my-tags-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/tags/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyTagsDashboard />;
}
