import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/rm/create/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/app/rm/create/"!</div>;
}
