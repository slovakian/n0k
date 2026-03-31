import { useChatStore } from "../-store";
import { ChatMessage } from "./chat-message";
import "./chat-window.css";

interface ChatWindowProps {
	roomId: string;
	viewerUserId?: string | undefined;
	viewerAuthorLabel?: string | undefined;
}

export function ChatWindow({
	roomId,
	viewerUserId,
	viewerAuthorLabel,
}: ChatWindowProps) {
	const messages = useChatStore((state) => state.messages);

	return (
		<div className="chat-window">
			{messages.length === 0 ? (
				<div className="chat-window__empty">
					Room initialized. Waiting for messages...
				</div>
			) : (
				// Reverse so newest message is first in DOM; column-reverse
				// CSS puts DOM-first at the visual bottom, giving terminal behaviour.
				[...messages]
					.reverse()
					.map((message) => (
						<ChatMessage
							key={message.id}
							message={message}
							roomId={roomId}
							viewerUserId={viewerUserId}
							viewerAuthorLabel={viewerAuthorLabel}
						/>
					))
			)}
		</div>
	);
}
