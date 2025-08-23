import { NotFoundStatus } from "@common/extended-ui/status/components/prebuilt/not-found-status";
import { WAREHOUSES } from "@constants/device-storage/warehouses.constant";
import { Providers } from "@providers/providers";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import {
	LocalStorageConnector,
	WebWarehouse,
} from "@themineway/smart-storage-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.pcss";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultNotFoundComponent: () => (
		<div className="flex items-center justify-center items-center h-full w-full">
			<NotFoundStatus />
		</div>
	),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

WebWarehouse.setConnector(WAREHOUSES.ls, new LocalStorageConnector());

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className="h-full w-screen">
			<Providers>
				<RouterProvider router={router} />
			</Providers>
		</div>
	</StrictMode>,
);
