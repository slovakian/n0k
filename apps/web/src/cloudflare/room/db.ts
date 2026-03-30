import { messages } from "@n0k/db/schema/message";

import {
	type DrizzleSqliteDODatabase,
	drizzle,
} from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "./migrations/index";

const schema = { messages };

export type RoomDb = DrizzleSqliteDODatabase<typeof schema>;

export function createRoomDb(storage: DurableObjectStorage): RoomDb {
	return drizzle(storage, { schema });
}

export async function runMigrations(db: RoomDb): Promise<void> {
	await migrate(db, migrations);
}

export { messages };
