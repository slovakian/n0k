import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { authClient } from "./client";

// Type "function" is for server functions. Type "request" would be for api routes
export const requireAuthMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const session = (
		await authClient.getSession({
			fetchOptions: {
				headers: getRequestHeaders(),
			},
		})
	).data;
	return next({
		context: {
			session,
		},
	});
});
