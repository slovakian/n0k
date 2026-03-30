import { DurableObject } from "cloudflare:workers";
import type { env as cfEnv } from "@n0k/env/web/server";
import type { ClientMessage, ServerMessage, StoredMessage } from "../types";
import type { RoomDb } from "./db";
import { createRoomDb, messages, runMigrations } from "./db";

export class ChatRoom extends DurableObject {
	declare env: typeof cfEnv;
	private db: RoomDb;

	constructor(ctx: DurableObjectState, env: typeof cfEnv) {
		super(ctx, env);
		this.db = createRoomDb(ctx.storage);
		ctx.blockConcurrencyWhile(async () => {
			await runMigrations(this.db);
		});
	}

	async fetch(request: Request): Promise<Response> {
		if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
			return new Response("Expected WebSocket upgrade", { status: 426 });
		}

		const pair = new WebSocketPair();
		const [client, server] = Object.values(pair) as [WebSocket, WebSocket];

		this.ctx.acceptWebSocket(server);

		const history = await this.db
			.select({
				id: messages.id,
				author: messages.author,
				content: messages.content,
				timestamp: messages.timestamp,
				msgType: messages.msgType,
			})
			.from(messages);

		server.send(
			JSON.stringify({
				type: "history",
				messages: history,
			} satisfies ServerMessage),
		);

		return new Response(null, { status: 101, webSocket: client });
	}

	async webSocketMessage(
		_ws: WebSocket,
		raw: string | ArrayBuffer,
	): Promise<void> {
		const text = typeof raw === "string" ? raw : new TextDecoder().decode(raw);

		let payload: ClientMessage;
		try {
			payload = JSON.parse(text) as ClientMessage;
		} catch {
			return;
		}

		if (payload.type !== "message") return;

		const roomId = this.ctx.id.name ?? this.ctx.id.toString();

		const stored: StoredMessage = {
			id: crypto.randomUUID(),
			author: payload.author,
			content: payload.content,
			timestamp: Date.now(),
			msgType: "user",
		};

		await this.db.insert(messages).values({ ...stored, roomId });

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
