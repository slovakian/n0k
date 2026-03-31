import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { roomsCollection } from "@/data/rooms/collections";
import { useSession } from "@/features/auth/query";
import { ChatInput } from "./-components/chat-input";
import { ChatWindow } from "./-components/chat-window";
import { RoomSidebar } from "./-components/room-sidebar";
import { StatusBar } from "./-components/status-bar";
import { useRoomWs } from "./-hooks/use-room-ws";
import "./-components/chat-page.css";
import "./-components/room-not-found.css";
import "./-components/room-sidebar.css";
import "./-components/status-bar.css";

export const Route = createFileRoute("/app/rm/$roomId/")({
	component: RouteComponent,
	notFoundComponent: RoomNotFound,
});

function RoomNotFound() {
	const { roomId } = Route.useParams();
	return (
		<div className="room-not-found">
			<p className="room-not-found__message">
				No room for id <code>{roomId}</code>.
			</p>
			<p>
				<Link to="/app" className="room-not-found__link">
					← back to app
				</Link>
			</p>
		</div>
	);
}

function RouteComponent() {
	const { roomId } = Route.useParams();
	// Eager `rooms` sync loads the full list once; filtering via `.where()` in a
	// live query does not pair reliably with eager query-db-collection (subset /
	// ready semantics), so resolve the current room by id in memory.
	const {
		data: rooms,
		isLoading,
		isReady: roomsReady,
	} = useLiveQuery((q) => q.from({ room: roomsCollection }), []);

	const { data: session, isPending: sessionPending } = useSession();
	const user = session?.user as
		| {
				displayUsername?: string | null;
				username?: string | null;
				name?: string | null;
		  }
		| undefined;
	const currentUser =
		sessionPending && !session
			? "…"
			: (user?.displayUsername?.trim() ||
					user?.username?.trim() ||
					user?.name?.trim() ||
					"guest");
	const { sendMessage } = useRoomWs(roomId);

	const room = rooms?.find((r) => r.id === roomId);

	if (roomsReady && !room) {
		throw notFound({ routeId: "/app/rm/$roomId/" });
	}

	const title =
		isLoading || !roomsReady || !room
			? "rm:…"
			: `rm:${room.name}(${room.roomNumber})`;

	return (
		<div className="chat-page">
			<div className="chat-page__header">
				<span className="chat-page__title" aria-busy={isLoading || !roomsReady}>
					{title}
				</span>
			</div>
			<div className="chat-page__body">
				<div className="chat-page__main">
					<ChatWindow />
					<ChatInput currentUser={currentUser} onSend={sendMessage} />
				</div>
				<RoomSidebar />
			</div>
			<StatusBar roomTitle={title} />
		</div>
	);
}
