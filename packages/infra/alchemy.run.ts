/** biome-ignore-all lint/style/noNonNullAssertion: Needed for env */
import alchemy from "alchemy";
import {
	D1Database,
	DurableObjectNamespace,
	TanStackStart,
	Worker,
} from "alchemy/cloudflare";
import { GitHubComment } from "alchemy/github";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("n0k", {
	stateStore:
		process.env.NODE_ENV === "production" || process.env.CI
			? (scope) =>
					new CloudflareStateStore(scope, {
						stateToken: alchemy.secret(process.env.ALCHEMY_STATE_TOKEN),
					})
			: undefined, // Uses default FileSystemStateStore
	password: process.env.ALCHEMY_PASSWORD!, // Not used in local dev
});

const isProduction = app.stage === "prod";
const isPr = app.stage.startsWith("pr-");

const db = await D1Database("database", {
	migrationsDir: "../../packages/db/src/migrations",
});

const chatRoom = DurableObjectNamespace("chat-room", { className: "ChatRoom" });

export const webWorker = await TanStackStart("web", {
	domains: isProduction ? ["n0k.org"] : undefined,
	cwd: "../../apps/web",
	// wrangler: {
	// 	main: "../../apps/web/src/server.ts",
	// },
	bindings: {
		DB: db,
		ROOM: chatRoom,
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

console.log(`Web    -> ${webWorker.url}`);

if (process.env.PULL_REQUEST) {
	// if this is a PR, add a comment to the PR with the preview URL
	// it will auto-update with each push
	await GitHubComment("preview-comment", {
		owner: "slovakian",
		repository: "@slovakian/n0k",
		issueNumber: Number(process.env.PULL_REQUEST),
		body: `## 🚀 Preview Deployed
  
  Your changes have been deployed to a preview environment:
  
  **🌐 Website:** ${webWorker.url}
  
  Built from commit ${process.env.GITHUB_SHA?.slice(0, 7)}
  
  +---
  <sub>🤖 This comment updates automatically with each push.</sub>`,
	});
}

await app.finalize();
