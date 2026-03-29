import path from "node:path";

import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({
  path: "../../apps/web/.env",
});

// `prisma generate` (including postinstall) loads this file but does not open a DB.
// CI has no DATABASE_URL; runtime uses D1 via PrismaD1 + binding, not this URL.
const databaseUrl =
  process.env.DATABASE_URL?.trim() ||
  "file:./.prisma-generate-placeholder.sqlite";

export default defineConfig({
  schema: path.join("prisma", "schema"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    url: databaseUrl,
  },
});
