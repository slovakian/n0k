import { DurableObject } from "cloudflare:workers";
import type { ClientMessage, ServerMessage, StoredMessage } from "./types";

export class ChatRoom extends DurableObject {
	private messages: StoredMessage[] = [];

	async fetch(request: Request): Promise<Response> {
		if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
			return new Response("Expected WebSocket upgrade", { status: 426 });
		}

		const pair = new WebSocketPair();
		const [client, server] = Object.values(pair) as [WebSocket, WebSocket];

		this.ctx.acceptWebSocket(server);

		server.send(
			JSON.stringify({
				type: "history",
				messages: this.messages,
			} satisfies ServerMessage),
		);

		return new Response(null, { status: 101, webSocket: client });
	}

	async webSocketMessage(
		_ws: WebSocket,
		raw: string | ArrayBuffer,
	): Promise<void> {
		const text =
			typeof raw === "string" ? raw : new TextDecoder().decode(raw);

		let payload: ClientMessage;
		try {
			payload = JSON.parse(text) as ClientMessage;
		} catch {
			return;
		}

		if (payload.type !== "message") return;

		const stored: StoredMessage = {
			id: crypto.randomUUID(),
			author: payload.author,
			content: payload.content,
			timestamp: Date.now(),
			msgType: "user",
		};

		this.messages.push(stored);

		const broadcast = JSON.stringify({
			type: "message",
			message: stored,
		} satisfies ServerMessage);

		for (const socket of this.ctx.getWebSockets()) {
			socket.send(broadcast);
		}
	}

	async webSocketClose(
		ws: WebSocket,
		code: number,
		reason: string,
	): Promise<void> {
		ws.close(code, reason);
	}
}
