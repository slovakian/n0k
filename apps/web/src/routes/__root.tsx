import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import appCss from "../index.css?url";

// biome-ignore lint/complexity/noBannedTypes: Temporary empty context
export type RouterAppContext = {};

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "n0k",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<html lang="en" data-webtui-theme="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="app-shell">
					<div className="app-shell-main">
						<Outlet />
					</div>
				</div>
				<TanStackRouterDevtools position="bottom-left" />
				<Scripts />
			</body>
		</html>
	);
}
