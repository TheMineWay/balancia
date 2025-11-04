import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/social/contacts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/social/contacts/"!</div>;
}
