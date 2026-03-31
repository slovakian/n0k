import { env } from "@n0k/env/web/server";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

export * from "./schema";

export function createDb() {
	return drizzle(env.DB, { schema });
}
