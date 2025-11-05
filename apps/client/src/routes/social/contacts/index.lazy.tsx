import { MyContactsDashboard } from "@fts/social/contacts/my-contacts/components/dashboard/my-contacts-dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/social/contacts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MyContactsDashboard />;
}
