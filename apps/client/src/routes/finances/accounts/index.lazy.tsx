import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/accounts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/accounts/"!</div>;
}
