import { SignOutButton } from "@common/core/auth/session/components/actions/sign-out-button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="p-2 flex gap-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>
				<SignOutButton />
			</div>
			<hr />
			<div className="mt-8">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
