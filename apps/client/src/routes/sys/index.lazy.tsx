import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/sys/"!</div>;
}
