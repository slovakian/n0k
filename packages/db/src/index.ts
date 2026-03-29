import { env } from "@n0k/env/web/server";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "../prisma/generated/client";

export function createDb() {
	const adapter = new PrismaD1(env.DB);
	return new PrismaClient({ adapter });
}
