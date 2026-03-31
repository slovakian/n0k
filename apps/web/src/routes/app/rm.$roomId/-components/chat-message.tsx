import { usernamePaletteIndex } from "@/features/chat/utils/usernames";
import type { ChatMessage as MessageType } from "../-store";
import "./chat-message.css";

interface ChatMessageProps {
	message: MessageType;
	roomId: string;
	/** When set and `message.author` matches `viewerAuthorLabel`, palette uses this (real user id). */
	viewerUserId?: string | undefined;
	viewerAuthorLabel?: string | undefined;
}

export function ChatMessage({
	message,
	roomId,
	viewerUserId,
	viewerAuthorLabel,
}: ChatMessageProps) {
	const timeString = new Date(message.timestamp).toLocaleTimeString("en-US", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	if (message.type === "system") {
		return (
			<div className="chat-message chat-message--system">
				<span className="chat-message__system-tag">[SYSTEM]</span>
				<span className="chat-message__content">{message.content}</span>
			</div>
		);
	}

	const paletteKey =
		viewerUserId &&
		viewerAuthorLabel !== undefined &&
		message.author === viewerAuthorLabel
			? viewerUserId
			: message.author;
	const palette = usernamePaletteIndex(paletteKey, roomId);

	return (
		<div className="chat-message">
			<span className="chat-message__time">[{timeString}]</span>
			<span
				className="chat-message__author"
				data-author-palette={String(palette)}
			>
				{message.author}:
			</span>
			<span className="chat-message__content">{message.content}</span>
		</div>
	);
}
