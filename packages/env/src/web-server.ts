import { env as appEnv } from "cloudflare:workers";
import type { webWorker } from "@n0k/infra/alchemy.run";

export const env = appEnv as typeof webWorker.Env;
