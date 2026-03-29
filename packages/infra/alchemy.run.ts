/** biome-ignore-all lint/style/noNonNullAssertion: Needed for env */
import alchemy from "alchemy";
import { D1Database, TanStackStart, Worker } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("n0k");

const isProduction = app.stage === "prod";
const isPr = app.stage.startsWith("pr-");

const db = await D1Database("database", {
	migrationsDir: "../../packages/db/src/migrations",
	adopt: true,
});

export const appWorker = await TanStackStart("app", {
	cwd: "../../apps/web",
	bindings: {
		DB: db,
		CORS_ORIGIN: isProduction
			? "https://n0k.org"
			: isPr
				? Worker.DevUrl
				: "http://localhost:3001",
		BETTER_AUTH_URL: isProduction
			? "https://n0k.org"
			: isPr
				? Worker.DevUrl
				: "http://localhost:3001",
		BETTER_AUTH_SECRET:
			isProduction || isPr ? alchemy.secret.env.BETTER_AUTH_SECRET! : "secret",
	},
});

console.log(`Web    -> ${appWorker.url}`);

await app.finalize();
