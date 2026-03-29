import { env as appEnv } from "cloudflare:workers";
import type { appWorker } from "../../infra/alchemy.run";

export const env = appEnv as typeof appWorker.Env;
