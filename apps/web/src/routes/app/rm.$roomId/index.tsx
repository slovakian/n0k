import { createFileRoute } from "@tanstack/react-router";
import { ChatInput } from "./-components/chat-input";
import { ChatWindow } from "./-components/chat-window";
import { RoomSidebar } from "./-components/room-sidebar";
import { StatusBar } from "./-components/status-bar";
import { useRoomWs } from "./-hooks/use-room-ws";
import "./-components/chat-page.css";
import "./-components/room-sidebar.css";
import "./-components/status-bar.css";

export const Route = createFileRoute("/app/rm/$roomId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { roomId } = Route.useParams();
	const currentUser = "user"; // TODO: Get from auth context
	const { sendMessage } = useRoomWs(roomId);

	return (
		<div className="chat-page">
			<div className="chat-page__header">
				<span className="chat-page__title">rm:{roomId}</span>
			</div>
			<div className="chat-page__body">
				<div className="chat-page__main">
					<ChatWindow />
					<ChatInput currentUser={currentUser} onSend={sendMessage} />
				</div>
				<RoomSidebar />
			</div>
			<StatusBar roomId={roomId} />
		</div>
	);
}
