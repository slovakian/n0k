import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const room = sqliteTable("room", {
	id: text("id").primaryKey(),
	pageSize: integer("page_size").notNull().default(30),
});
