import { env } from "@n0k/env/web/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/room/$roomId/ws")({
	server: {
		handlers: {
			GET: ({ request, params }) => {
				const id = env.ROOM.idFromName(params.roomId);
				const stub = env.ROOM.get(id);
				return stub.fetch(request);
			},
		},
	},
});
