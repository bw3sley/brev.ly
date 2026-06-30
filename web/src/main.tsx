import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { client } from "./lib/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={client}>
				<RouterProvider router={router} />
				<Toaster richColors />
			</QueryClientProvider>
		</StrictMode>,
	);
}
