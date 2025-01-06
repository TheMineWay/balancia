import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/me/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/me/profile/"!</div>;
}
