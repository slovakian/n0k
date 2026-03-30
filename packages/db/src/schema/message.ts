import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messages = sqliteTable("messages", {
	id: text("id").primaryKey(),
	roomId: text("room_id").notNull(),
	author: text("author").notNull(),
	content: text("content").notNull(),
	timestamp: integer("timestamp").notNull(),
	msgType: text("msg_type", { enum: ["user", "system"] })
		.notNull()
		.default("user"),
});
