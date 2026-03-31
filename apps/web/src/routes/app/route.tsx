// Layout wraps the entire app.

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { preloadAppCollections } from "@/data/utils";

export const Route = createFileRoute("/app")({
	loader: async () => {
		await preloadAppCollections();
	},
	component: RouteComponent,
	ssr: false, // IMPORTANT: App routes are client-only
});

function RouteComponent() {
	return <Outlet />;
}
