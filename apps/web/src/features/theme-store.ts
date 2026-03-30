import { create } from "zustand";
import { DEFAULT_THEME } from "./themes";

interface ThemeStore {
	theme: string;
	setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: DEFAULT_THEME,
	setTheme: (theme) => {
		if (typeof window !== "undefined") {
			localStorage.setItem("n0k-theme", theme);
		}
		set({ theme });
	},
}));

// Rehydrate from localStorage on the client
if (typeof window !== "undefined") {
	const stored = localStorage.getItem("n0k-theme");
	if (stored) {
		useThemeStore.setState({ theme: stored });
	}
}
