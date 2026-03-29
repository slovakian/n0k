import { useState } from "react";
import "./chat-input.css";

interface ChatInputProps {
	currentUser: string;
	onSend: (author: string, content: string) => void;
}

export function ChatInput({ currentUser, onSend }: ChatInputProps) {
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

	return (
		<div className="chat-input">
			<span className="chat-input__prompt">{currentUser}&gt;</span>
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
