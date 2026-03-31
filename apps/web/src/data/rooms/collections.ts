import {
	parseLoadSubsetOptions,
	queryCollectionOptions,
} from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { queryClient } from "@/lib/query";
import { listAllRooms, listRoomMessages } from "./fns";

// ─── Rooms ────────────────────────────────────────────────────────────────────
// Eager: small dataset, load all rooms up front.

export const roomsCollection = createCollection(
	queryCollectionOptions({
		id: "rooms",
		queryKey: ["rooms"],
		queryClient,
		getKey: (room: { id: string }) => room.id,
		syncMode: "eager",
		queryFn: () => listAllRooms(),
	}),
);

// ─── Room messages ────────────────────────────────────────────────────────────
// On-demand: a single collection for all rooms. When a live query filters by
// roomId (e.g. eq(msg.roomId, id)), that predicate is pushed down to queryFn
// via ctx.meta?.loadSubsetOptions — no per-room factory needed.
//
// queryKey is a function so each distinct filter/sort/offset combination gets
// its own TQ cache entry while sharing the ["messages"] base prefix for
// cache invalidation. offset is included so paginated pages are distinct entries.

export const messagesCollection = createCollection(
	queryCollectionOptions({
		id: "messages",
		queryKey: (opts) => {
			const { filters } = parseLoadSubsetOptions(opts);
			const offset = opts?.offset;
			const roomId = filters.find(
				(f) => f.field.join(".") === "roomId" && f.operator === "eq",
			)?.value;
			return [
				"messages",
				...(roomId ? [String(roomId)] : []),
				...(offset ? [`offset-${offset}`] : []),
			];
		},
		queryClient,
		getKey: (msg: { id: string }) => msg.id,
		syncMode: "on-demand",
		queryFn: async (ctx) => {
			const { filters, sorts } = parseLoadSubsetOptions(
				ctx.meta?.loadSubsetOptions,
			);
			const offset = ctx.meta?.loadSubsetOptions?.offset;
			return listRoomMessages({ data: { filters, sorts, offset } });
		},
	}),
);
