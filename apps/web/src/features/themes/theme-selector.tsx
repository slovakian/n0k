import { THEMES } from "./index";
import { useThemeStore } from "./store";
import "./theme-selector.css";

export function ThemeSelector() {
	const theme = useThemeStore((s) => s.theme);
	const setTheme = useThemeStore((s) => s.setTheme);
	const currentIndex = THEMES.findIndex((t) => t.id === theme);

	const cyclePrev = () => {
		const prev = (currentIndex - 1 + THEMES.length) % THEMES.length;
		setTheme(THEMES[prev].id);
	};

	const cycleNext = () => {
		const next = (currentIndex + 1) % THEMES.length;
		setTheme(THEMES[next].id);
	};

	return (
		<div className="theme-selector">
			<button
				type="button"
				size-="small"
				className="theme-selector__btn"
				onClick={cyclePrev}
				title="Previous theme"
				aria-label="Previous theme"
			>
				‹
			</button>
			<span className="theme-selector__name">{theme}</span>
			<button
				type="button"
				size-="small"
				className="theme-selector__btn"
				onClick={cycleNext}
				title="Next theme"
				aria-label="Next theme"
			>
				›
			</button>
		</div>
	);
}
