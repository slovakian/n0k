import { createDb } from "@n0k/db";
import { createServerFn } from "@tanstack/react-start";

export const listAllRooms = createServerFn({ method: "GET" }).handler(
	async () => {
		const db = createDb();
		return db.query.room.findMany();
	},
);
