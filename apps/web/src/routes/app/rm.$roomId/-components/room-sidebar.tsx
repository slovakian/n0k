import "./room-sidebar.css";

// Mock thermodynamic room state — wired to real data later
const MOCK_ROOM = {
	id: "abc123",
	name: "abc123",
	status: "HOT" as const,
	// Temperature
	T: 245.3,
	T_death: 1.0,
	// Fuel
	fuel: 87.3,
	drainRate: 3.2, // FU/hr
	estTimeToDeathHours: 27,
	estTimeToDeathMinutes: 17,
	// Activity
	activeUsers: 7,
	totalMessages: 342,
	lifespanHours: 4,
	lifespanMinutes: 23,
	peakTemp: 431.0,
	graceExpired: true,
	// Platform
	platformPulse: 847, // msg/min
	coolingMultiplier: 1.4,
	liveRooms: 62,
	// Per-user cost estimate
	nextMsgFuCost: 0.041,
};

const STATUS_LABELS = {
	INFERNO: "INFERNO",
	HOT: "HOT",
	ACTIVE: "ACTIVE",
	COOLING: "COOLING",
	CRITICAL: "CRITICAL",
	DEAD: "DEAD",
} as const;

export function RoomSidebar() {
	const room = MOCK_ROOM;

	return (
		<aside className="room-sidebar" box-="square">
			{/* Room header */}
			<div className="room-sidebar__section">
				<div className="room-sidebar__label">ROOM</div>
				<div className="room-sidebar__value room-sidebar__room-id">
					{room.name}
				</div>
				<div
					className={`room-sidebar__status room-sidebar__status--${room.status.toLowerCase()}`}
				>
					■ {STATUS_LABELS[room.status]}
				</div>
			</div>

			<div is-="separator" />

			{/* Temperature */}
			<div className="room-sidebar__section">
				<div className="room-sidebar__label">TEMPERATURE</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">T</span>
					<span className="room-sidebar__value room-sidebar__temp">
						{room.T.toFixed(1)} K
					</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">T_death</span>
					<span className="room-sidebar__value">
						{room.T_death.toFixed(1)} K
					</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">k_eff</span>
					<span className="room-sidebar__value">1.4×</span>
				</div>
			</div>

			<div is-="separator" />

			{/* Fuel */}
			<div className="room-sidebar__section">
				<div className="room-sidebar__label">FUEL</div>
				<div className="room-sidebar__fuel-primary">
					{room.fuel.toFixed(1)} <span className="room-sidebar__unit">FU</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">drain</span>
					<span className={"room-sidebar__value room-sidebar__drain"}>
						{room.drainRate.toFixed(1)} FU/hr
					</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">est. death</span>
					<span className="room-sidebar__value">
						~{room.estTimeToDeathHours}h{" "}
						{String(room.estTimeToDeathMinutes).padStart(2, "0")}m
					</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">your cost</span>
					<span className="room-sidebar__value">
						{room.nextMsgFuCost.toFixed(3)} FU/msg
					</span>
				</div>
			</div>

			<div is-="separator" />

			{/* Activity */}
			<div className="room-sidebar__section">
				<div className="room-sidebar__label">ACTIVITY</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">users</span>
					<span className="room-sidebar__value">{room.activeUsers}</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">messages</span>
					<span className="room-sidebar__value">{room.totalMessages}</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">lifespan</span>
					<span className="room-sidebar__value">
						{room.lifespanHours}h{" "}
						{String(room.lifespanMinutes).padStart(2, "0")}m
					</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">peak T</span>
					<span className="room-sidebar__value">
						{room.peakTemp.toFixed(1)} K
					</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">grace</span>
					<span className="room-sidebar__value room-sidebar__grace-expired">
						expired
					</span>
				</div>
			</div>

			<div is-="separator" />

			{/* Platform Pulse */}
			<div className="room-sidebar__section">
				<div className="room-sidebar__label">PLATFORM PULSE</div>
				<div className="room-sidebar__pulse-value">
					{room.platformPulse} msg/min
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">cooling</span>
					<span className="room-sidebar__value">{room.coolingMultiplier}×</span>
				</div>
				<div className="room-sidebar__row">
					<span className="room-sidebar__key">live rooms</span>
					<span className="room-sidebar__value">{room.liveRooms}</span>
				</div>
			</div>
		</aside>
	);
}
