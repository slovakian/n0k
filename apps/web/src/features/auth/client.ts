import type { BetterAuthClientOptions } from "better-auth";
import { anonymousClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authOptions = {
	plugins: [anonymousClient(), usernameClient()],
} satisfies BetterAuthClientOptions;

export const authClient = createAuthClient({ ...authOptions });
