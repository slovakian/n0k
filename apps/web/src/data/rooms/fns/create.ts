import { createDb, room } from "@n0k/db";
import { createServerFn } from "@tanstack/react-start";
import { eq, max } from "drizzle-orm";
import { z } from "zod";
import { requireAuthMiddleware } from "@/features/auth/middleware";

const URL_SAFE_NAME = /^[a-zA-Z0-9_-]+$/;

const createRoomSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(32, "Name must be 32 characters or fewer")
		.regex(URL_SAFE_NAME, "Name may only contain letters, numbers, hyphens, and underscores"),
	description: z.string().max(280, "Description must be 280 characters or fewer").optional(),
});

export const createRoomServerFn = createServerFn({ method: "POST" })
	.inputValidator(createRoomSchema)
	.middleware([requireAuthMiddleware])
	.handler(async ({ data }) => {
		const db = createDb();
		const id = crypto.randomUUID();

		const [result] = await db
			.select({ maxNumber: max(room.roomNumber) })
			.from(room)
			.where(eq(room.name, data.name));

		const roomNumber = (result?.maxNumber ?? 0) + 1;

		await db.insert(room).values({ id, name: data.name, description: data.description, roomNumber });
		return { id };
	});
