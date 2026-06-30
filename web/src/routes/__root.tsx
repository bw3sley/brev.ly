import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFound } from "./not-found";

function RootLayout() {
	return (
		<div className="bg-gray-200 text-gray-600 min-h-screen w-full">
			<Outlet />
		</div>
	);
}

export const Route = createRootRoute({
	component: RootLayout,
	notFoundComponent: NotFound,
});
