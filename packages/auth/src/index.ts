import { createDb } from "@n0k/db";
import * as schema from "@n0k/db/schema/auth";
import { env } from "@n0k/env/web/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { anonymous } from "better-auth/plugins/anonymous";
import { username } from "better-auth/plugins/username";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import {
	assignUniqueUsername,
	isGeneratedUsernameFormat,
} from "./generated-username";

export function createAuth() {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema: schema,
		}),
		trustedOrigins: [env.CORS_ORIGIN],
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		disabledPaths: ["/is-username-available"],
		hooks: {
			before: createAuthMiddleware(async (ctx) => {
				if (
					ctx.path === "/sign-up/email" &&
					ctx.body &&
					typeof ctx.body === "object" &&
					!Array.isArray(ctx.body)
				) {
					const body = ctx.body as Record<string, unknown>;
					const { username: _u, displayUsername: _d, ...rest } = body;
					return {
						context: {
							...ctx,
							body: rest,
						},
					};
				}
				if (
					ctx.path === "/update-user" &&
					ctx.body &&
					typeof ctx.body === "object" &&
					!Array.isArray(ctx.body)
				) {
					const body = ctx.body as Record<string, unknown>;
					if ("username" in body || "displayUsername" in body) {
						throw APIError.from("FORBIDDEN", {
							code: "USERNAME_IMMUTABLE",
							message: "Username cannot be changed.",
						});
					}
				}
			}),
		},
		databaseHooks: {
			user: {
				create: {
					before: async (user, ctx) => {
						const { username, displayUsername } = await assignUniqueUsername(
							ctx?.context,
						);
						return {
							data: {
								...user,
								username,
								displayUsername,
							},
						};
					},
				},
				update: {
					before: async (data) => {
						if (!data || typeof data !== "object" || Array.isArray(data)) {
							return { data };
						}
						const {
							username: _u,
							displayUsername: _d,
							...rest
						} = data as Record<string, unknown>;
						return { data: rest };
					},
				},
			},
		},
		plugins: [
			tanstackStartCookies(),
			anonymous(),
			username({
				maxUsernameLength: 64,
				usernameNormalization: false,
				usernameValidator: isGeneratedUsernameFormat,
			}),
		],
	});
}
