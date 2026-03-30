import { createDb } from "@n0k/db";
import type { SimpleComparison, ParsedOrderBy } from "@tanstack/react-db";
import { createServerFn } from "@tanstack/react-start";
import type { StoredMessage } from "@/cloudflare/types";

export const listAllRooms = createServerFn({ method: "GET" }).handler(
	async () => {
		const db = createDb();
		return db.query.room.findMany();
	},
);

export const listRoomMessages = createServerFn({ method: "GET" })
	.inputValidator(
		(data: {
			filters?: SimpleComparison[];
			sorts?: ParsedOrderBy[];
			offset?: number;
		}) => data,
	)
	.handler(async ({ data: { filters, sorts: _sorts, offset: _offset } }) => {
		const roomId = filters?.find(
			(f) => f.field.join(".") === "roomId" && f.operator === "eq",
		)?.value as string | undefined;

		if (!roomId) return [] as StoredMessage[];

		// Limit is hard-coded to 30; use _offset and _sorts when querying D1.
		// TODO: query messages from D1 using roomId, _sorts, _offset, limit=30.
		return [] as StoredMessage[];
	});
