/**
 * Removes TanStack Start / Worker resource rows from the remote CloudflareStateStore
 * (SQLite in the alchemy-state-service Durable Object) for a given app + stage.
 *
 * Use when Cloudflare state still references a worker you deleted manually, so redeploy
 * can recreate bindings and custom domains (e.g. n0k.org) without renaming the worker.
 *
 * To resolve the state worker URL you need either:
 * - ALCHEMY_STATE_STORE_URL (full https://alchemy-state-service.*.workers.dev URL), or
 * - CLOUDFLARE_API_TOKEN in env (e.g. packages/infra/.env) so the script does not rely on
 *   `alchemy login` OAuth (stale OAuth causes invalid_grant when fetching account subdomain).
 *
 * Always: ALCHEMY_STATE_TOKEN. Optional: CLOUDFLARE_ACCOUNT_ID.
 *
 * Usage (from packages/infra):
 *   ALCHEMY_STAGE=prod bun run ./scripts/clear-cloudflare-state-web.ts
 *   bun run ./scripts/clear-cloudflare-state-web.ts --stage prod
 *
 * Dry run (print IDs only):
 *   ALCHEMY_STATE_DRY_RUN=1 ALCHEMY_STAGE=prod bun run ./scripts/clear-cloudflare-state-web.ts
 */
import { config } from "dotenv";
import { createCloudflareApi, getAccountSubdomain } from "alchemy/cloudflare";

// Same layout as alchemy.run.ts when cwd is packages/infra
config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const APP = process.env.ALCHEMY_STATE_APP ?? "n0k";
const SCRIPT_NAME =
	process.env.ALCHEMY_STATE_SERVICE_SCRIPT ?? "alchemy-state-service";
const RESOURCE_ID = process.env.ALCHEMY_STATE_RESOURCE_ID ?? "web";
const EXTRA_DELETE_IDS = (process.env.ALCHEMY_STATE_EXTRA_DELETE_IDS ?? "n0k.org")
	.split(",")
	.map((s) => s.trim())
	.filter(Boolean);
const DRY_RUN = process.env.ALCHEMY_STATE_DRY_RUN === "1";

function parseStage(): string | undefined {
	const i = process.argv.indexOf("--stage");
	if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
	return process.env.ALCHEMY_STAGE;
}

function shouldDeleteStateId(id: string): boolean {
	if (EXTRA_DELETE_IDS.includes(id)) return true;
	if (id === RESOURCE_ID) return true;
	if (id === `${RESOURCE_ID}-build`) return true;
	if (id.startsWith(`${RESOURCE_ID}-`)) return true;
	return false;
}

async function stateRpc<T>(
	url: string,
	token: string,
	chain: string[],
	method: string,
	params: unknown[],
): Promise<T> {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ method, params, context: { chain } }),
	});
	const json = (await res.json()) as
		| { success: true; result: T }
		| { success: false; error: string };
	if (!json.success) {
		throw new Error(
			`State store ${method} failed (${res.status}): ${(json as { error: string }).error}`,
		);
	}
	return json.result;
}

const stage = parseStage();
if (!stage) {
	console.error(
		"Missing stage: set ALCHEMY_STAGE or pass --stage <name> (production uses prod).",
	);
	process.exit(1);
}

const token = process.env.ALCHEMY_STATE_TOKEN;
if (!token) {
	console.error("Missing ALCHEMY_STATE_TOKEN.");
	process.exit(1);
}

const chain = [APP, stage];

function resolveStateStoreUrl(): Promise<string> {
	const explicit = process.env.ALCHEMY_STATE_STORE_URL;
	if (explicit) return Promise.resolve(explicit);

	const hasTokenAuth =
		Boolean(process.env.CLOUDFLARE_API_TOKEN) ||
		Boolean(process.env.CLOUDFLARE_API_KEY);

	return (async () => {
		try {
			const api = await createCloudflareApi({});
			const subdomain = await getAccountSubdomain(api);
			return `https://${SCRIPT_NAME}.${subdomain}.workers.dev`;
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			const oauthStale =
				msg.includes("invalid_grant") || msg.includes("OAuthError");
			console.error(
				"\nCould not discover the Cloudflare state store URL (account workers subdomain).",
			);
			if (!hasTokenAuth) {
				console.error(
					"\npackages/infra/.env loaded no CLOUDFLARE_API_TOKEN; Alchemy fell back to saved OAuth, which often fails with invalid_grant when the refresh token expired.\n",
				);
			}
			console.error("Fix one of:");
			console.error(
				"  1. Add CLOUDFLARE_API_TOKEN to packages/infra/.env (same token you use for deploy / wrangler).",
			);
			console.error(
				`  2. Set ALCHEMY_STATE_STORE_URL=https://${SCRIPT_NAME}.<your-subdomain>.workers.dev`,
			);
			console.error(
				"     (subdomain: Workers & Pages → any worker → *.workers.dev hostname prefix before .workers.dev)",
			);
			if (oauthStale || !hasTokenAuth) {
				console.error("  3. Run: bunx alchemy login cloudflare");
			}
			console.error("");
			throw e;
		}
	})();
}

const url = await resolveStateStoreUrl();

console.log(`State store: ${url}`);
console.log(`Scope chain: ${JSON.stringify(chain)}`);
console.log(
	`Matching resource id: ${RESOURCE_ID} (+ ${RESOURCE_ID}-*, build) and extras: ${EXTRA_DELETE_IDS.join(", ") || "(none)"}`,
);

const ids = await stateRpc<string[]>(url, token, chain, "list", []);
const toDelete = ids.filter(shouldDeleteStateId);

if (toDelete.length === 0) {
	console.log("No matching resource IDs in remote state for this stage.");
	process.exit(0);
}

console.log(DRY_RUN ? "Would delete:" : "Deleting:", toDelete.join(", "));

if (DRY_RUN) {
	process.exit(0);
}

for (const id of toDelete) {
	await stateRpc<void>(url, token, chain, "delete", [id]);
	console.log(`Deleted state key: ${id}`);
}

console.log("Done. Redeploy with: bun run deploy -- --stage " + stage);
