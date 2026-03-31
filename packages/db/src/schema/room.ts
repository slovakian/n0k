import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const room = sqliteTable(
	"room",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		description: text("description"),
		roomNumber: integer("room_number").notNull(),
		pageSize: integer("page_size").notNull().default(30),
	},
	(table) => ({
		nameRoomNumberUniq: uniqueIndex("room_name_number_uniq").on(
			table.name,
			table.roomNumber,
		),
	}),
);
