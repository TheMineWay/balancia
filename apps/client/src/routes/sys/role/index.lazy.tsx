import { RoleManager } from "@core-fts/role/manager/components/role-manager";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys/role/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RoleManager />;
}
