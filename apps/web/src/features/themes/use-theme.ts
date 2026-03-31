import { useSyncExternalStore } from "react";
import { DEFAULT_THEME } from ".";
import { userPrefsCollection } from "./collection";

// Reads theme from localStorage using TanStack DB's encoded key format.
// localStorageCollectionOptions prefixes string keys with "s:" when serializing.
function readTheme(): string {
	try {
		const raw = localStorage.getItem("n0k-prefs");
		if (!raw) return DEFAULT_THEME;
		const p = JSON.parse(raw);
		return p?.["s:local"]?.data?.theme ?? DEFAULT_THEME;
	} catch {
		return DEFAULT_THEME;
	}
}

function subscribe(callback: () => void): () => void {
	// "storage" fires in other tabs; "n0k-theme-change" fires in the same tab
	window.addEventListener("storage", callback);
	window.addEventListener("n0k-theme-change", callback);
	return () => {
		window.removeEventListener("storage", callback);
		window.removeEventListener("n0k-theme-change", callback);
	};
}

export function useTheme(): string {
	return useSyncExternalStore(
		subscribe,
		readTheme,
		() => DEFAULT_THEME, // getServerSnapshot: always default on server
	);
}

export function setTheme(newTheme: string): void {
	// Update the DOM immediately
	document.documentElement.setAttribute("data-webtui-theme", newTheme);

	// Write to TanStack DB localStorage collection
	try {
		const raw = localStorage.getItem("n0k-prefs");
		const hasEntry = raw !== null && JSON.parse(raw)?.["s:local"] != null;
		if (hasEntry) {
			userPrefsCollection.update("local", (draft) => {
				draft.theme = newTheme;
			});
		} else {
			userPrefsCollection.insert({ id: "local", theme: newTheme });
		}
	} catch {
		userPrefsCollection.insert({ id: "local", theme: newTheme });
	}

	// Notify same-tab subscribers
	window.dispatchEvent(new Event("n0k-theme-change"));
}
