import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main>
			<h1>n0k</h1>
			<p>Terminal-style chat rooms.</p>
		</main>
	);
}
