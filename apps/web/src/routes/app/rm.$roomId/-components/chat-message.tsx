import type { ChatMessage as MessageType } from "../-store";
import "./chat-message.css";

interface ChatMessageProps {
	message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
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

	return (
		<div className="chat-message">
			<span className="chat-message__time">[{timeString}]</span>
			<span className="chat-message__author">{message.author}:</span>
			<span className="chat-message__content">{message.content}</span>
		</div>
	);
}
