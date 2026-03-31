import { useThemeStore } from "@/features/themes/store";
import { THEMES } from "../../../../features/themes";
import "./status-bar.css";

// Mock global platform state — wired to real data later
const MOCK_PLATFORM = {
	pulse: 847,
	coolingMultiplier: 1.4,
	liveRooms: 62,
};

const MOCK_ROOM = {
	id: "abc123",
	status: "HOT",
	T: 245.3,
	fuel: 87.3,
	drainRate: 3.2,
	estHours: 27,
	estMinutes: 17,
};

interface StatusBarProps {
	roomId: string;
}

export function StatusBar({ roomId }: StatusBarProps) {
	const theme = useThemeStore((state) => state.theme);
	const setTheme = useThemeStore((state) => state.setTheme);

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
		<div className="status-bar">
			{/* Left: app + room info */}
			<div className="status-bar__left">
				<span className="status-bar__app">[n0k]</span>
				<span className="status-bar__sep">·</span>
				<span className="status-bar__room">rm:{roomId}</span>
				<span className="status-bar__sep">│</span>
				<span
					className={`status-bar__room-status status-bar__room-status--${MOCK_ROOM.status.toLowerCase()}`}
				>
					{MOCK_ROOM.status}
				</span>
				<span className="status-bar__temp">{MOCK_ROOM.T.toFixed(1)}K</span>
				<span className="status-bar__sep">│</span>
				<span className="status-bar__fuel">{MOCK_ROOM.fuel.toFixed(1)} FU</span>
				<span className="status-bar__drain">
					@ {MOCK_ROOM.drainRate.toFixed(1)} FU/hr
				</span>
				<span className="status-bar__sep">│</span>
				<span className="status-bar__ttd">
					~{MOCK_ROOM.estHours}h{String(MOCK_ROOM.estMinutes).padStart(2, "0")}m
				</span>
			</div>

			{/* Right: platform pulse + theme selector */}
			<div className="status-bar__right">
				<span className="status-bar__pulse">
					⚡ {MOCK_PLATFORM.pulse} msg/min · {MOCK_PLATFORM.coolingMultiplier}×
					· {MOCK_PLATFORM.liveRooms} live
				</span>
				<span className="status-bar__sep">│</span>
				<div className="status-bar__theme-selector">
					<button
						type="button"
						size-="small"
						className="status-bar__theme-btn"
						onClick={cyclePrev}
						title="Previous theme"
						aria-label="Previous theme"
					>
						‹
					</button>
					<span className="status-bar__theme-name">{theme}</span>
					<button
						type="button"
						size-="small"
						className="status-bar__theme-btn"
						onClick={cycleNext}
						title="Next theme"
						aria-label="Next theme"
					>
						›
					</button>
				</div>
			</div>
		</div>
	);
}
