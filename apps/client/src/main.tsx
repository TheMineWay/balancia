import Providers from "@app/providers";
import { WAREHOUSES } from "@constants/device-storage/warehouses.constant";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
	LocalStorageConnector,
	WebWarehouse,
} from "@themineway/smart-storage-js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.pcss";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

WebWarehouse.setConnector(WAREHOUSES.ls, new LocalStorageConnector());

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className="h-screen w-screen bg-gray-300">
			<Providers>
				<RouterProvider router={router} />
			</Providers>
		</div>
	</StrictMode>,
);
