import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { authQueryOptions } from "@/features/auth/query";
import { useTheme } from "@/features/themes/use-theme";
import appCss from "../index.css?url";

// Runs synchronously during HTML parsing, before first paint.
// Reads n0k-prefs (TanStack DB localStorage format) and stamps data-webtui-theme
// on <html> to prevent flash of wrong theme.
const THEME_INIT_SCRIPT = `(function(){try{var p=JSON.parse(localStorage.getItem('n0k-prefs')||'{}');var e=p['s:local'];var t=(e&&e.data&&e.data.theme)||'dark';document.documentElement.setAttribute('data-webtui-theme',t);}catch(e){}})();`;

export type RouterAppContext = {
	queryClient: QueryClient;
};

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
	loader: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(authQueryOptions);
		return { session };
	},

	component: RootDocument,
});

function RootDocument() {
	const theme = useTheme();

	return (
		// suppressHydrationWarning: the inline script mutates data-webtui-theme
		// before React hydrates, so server/client attribute values will differ.
		<html lang="en" data-webtui-theme={theme} suppressHydrationWarning>
			<head>
				{/* Must be first — runs before HeadContent injects the stylesheet */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body>
				<div className="app-shell">
					<div className="app-shell-main">
						<Outlet />
					</div>
				</div>
				<TanStackRouterDevtools position="top-right" />
				<Scripts />
			</body>
		</html>
	);
}
