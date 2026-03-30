import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import type { BetterAuthClientOptions } from "better-auth";
import { anonymousClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authOptions = {
	plugins: [anonymousClient(), usernameClient()],
} satisfies BetterAuthClientOptions;

const getAuth = createIsomorphicFn()
	.server(() =>
		createAuthClient({
			...authOptions,
			fetchOptions: {
				headers: getRequestHeaders(),
			},
		}),
	)
	.client(() => createAuthClient({ ...authOptions }));

export const authClient = getAuth();
