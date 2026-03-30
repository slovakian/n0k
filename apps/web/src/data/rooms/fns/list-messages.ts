import type { ParsedOrderBy, SimpleComparison } from "@tanstack/react-db";
import { createServerFn } from "@tanstack/react-start";
import type { StoredMessage } from "@/cloudflare/types";

export const listRoomMessages = createServerFn({ method: "GET" })
	.inputValidator(
		(data: {
			filters?: SimpleComparison[];
			sorts?: ParsedOrderBy[];
		}) => data,
	)
	.handler(async ({ data: { filters, sorts: _sorts } }) => {
		const roomId = filters?.find(
			(f) => f.field.join(".") === "roomId" && f.operator === "eq",
		)?.value as string | undefined;

		if (!roomId) return [] as StoredMessage[];

		// Hard-coded to 30 until the D1 messages table exists.
		// TODO: query messages from D1 using roomId, _sorts, limit=30.
		return [] as StoredMessage[];
	});
