import { ThemeSelector } from "@/features/themes/theme-selector";
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
	/** Same label as the chat header, e.g. `rm:name(1)` or `rm:…` while loading. */
	roomTitle: string;
}

export function StatusBar({ roomTitle }: StatusBarProps) {
	return (
		<div className="status-bar">
			{/* Left: app + room info */}
			<div className="status-bar__left">
				<span className="status-bar__app">[n0k]</span>
				<span className="status-bar__sep">·</span>
				<span className="status-bar__room">{roomTitle}</span>
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
				<ThemeSelector />
			</div>
		</div>
	);
}
