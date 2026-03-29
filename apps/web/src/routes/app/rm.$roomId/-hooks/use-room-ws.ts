import { useCallback, useEffect, useRef } from "react";
import type {
	ClientMessage,
	ServerMessage,
	StoredMessage,
} from "@/cloudflare/types";
import type { ChatMessage } from "../-store";
import { useChatStore } from "../-store";

function toChat(s: StoredMessage): ChatMessage {
	return {
		id: s.id,
		author: s.author,
		content: s.content,
		timestamp: s.timestamp,
		type: s.msgType,
	};
}

export function useRoomWs(roomId: string) {
	const wsRef = useRef<WebSocket | null>(null);
	const setMessages = useChatStore((s) => s.setMessages);
	const addMessage = useChatStore((s) => s.addMessage);

	useEffect(() => {
		const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
		const ws = new WebSocket(
			`${protocol}//${window.location.host}/api/room/${roomId}/ws`,
		);
		wsRef.current = ws;

		ws.onmessage = (event: MessageEvent) => {
			let msg: ServerMessage;
			try {
				msg = JSON.parse(event.data as string) as ServerMessage;
			} catch {
				return;
			}

			if (msg.type === "history") {
				setMessages(msg.messages.map(toChat));
			} else if (msg.type === "message") {
				addMessage({
					author: msg.message.author,
					content: msg.message.content,
					type: msg.message.msgType,
				});
			}
		};

		return () => {
			ws.close(1000, "unmounted");
			wsRef.current = null;
		};
	}, [roomId, setMessages, addMessage]);

	const sendMessage = useCallback((author: string, content: string) => {
		const ws = wsRef.current;
		if (!ws || ws.readyState !== WebSocket.OPEN) return;
		ws.send(
			JSON.stringify({
				type: "message",
				author,
				content,
			} satisfies ClientMessage),
		);
	}, []);

	return { sendMessage };
}
