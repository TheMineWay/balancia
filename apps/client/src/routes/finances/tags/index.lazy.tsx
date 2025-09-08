import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/finances/tags/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/finances/tags/"!</div>;
}
