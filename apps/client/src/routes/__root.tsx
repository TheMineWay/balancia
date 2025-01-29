import PageContainer from "@core/components/ui/container/page-container";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <hr />
      <PageContainer className="mt-4">
        <Outlet />
      </PageContainer>
      <TanStackRouterDevtools />
    </>
  ),
});
