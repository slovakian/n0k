import { useState } from "react";
import { usernamePaletteIndex } from "@/features/chat/utils/usernames";
import "./chat-message.css";
import "./chat-input.css";

interface ChatInputProps {
	currentUser: string;
	roomId: string;
	userId: string;
	onSend: (author: string, content: string) => void;
}

export function ChatInput({
	currentUser,
	roomId,
	userId,
	onSend,
}: ChatInputProps) {
	const [inputValue, setInputValue] = useState("");

	const handleSend = () => {
		if (inputValue.trim()) {
			onSend(currentUser, inputValue);
			setInputValue("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const palette = usernamePaletteIndex(userId, roomId);

	return (
		<div className="chat-input">
			<span
				className="chat-input__prompt"
				data-author-palette={String(palette)}
			>
				{currentUser}&gt;
			</span>
			<input
				type="text"
				className="chat-input__field"
				placeholder="type a message and press enter..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				// biome-ignore lint/a11y/noAutofocus: terminal UX — cursor lives here
				autoFocus
			/>
		</div>
	);
}
