// Layout wraps the entire app.

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: RouteComponent,
	ssr: false, // IMPORTANT: App routes are client-only
});

function RouteComponent() {
	return <Outlet />;
}
