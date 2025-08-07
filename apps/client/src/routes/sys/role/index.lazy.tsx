import { useProtection } from "@core-fts/permission/hooks/use-protection";
import { RoleManager } from "@core-fts/role/manager/components/role-manager";
import { Permission } from "@shared/models";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sys/role/")({
  component: RouteComponent,
});

function RouteComponent() {
  useProtection({
    condition: { type: "simple", permissions: [Permission.ADMIN] },
    routeProtection: true,
  });

  return <RoleManager />;
}
