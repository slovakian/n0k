import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mechanics")({
	component: MechanicsPage,
});

function MechanicsPage() {
	return (
		<main
			style={{
				minHeight: "100dvh",
				padding: "3rem 2rem",
				maxWidth: "900px",
				margin: "0 auto",
				color: "#aaaaaa",
				fontFamily: "monospace",
			}}
		>
			{/* Header */}
			<div style={{ marginBottom: "3rem" }}>
				<h1
					style={{
						color: "#00ff00",
						fontSize: "1.8rem",
						margin: "0 0 0.5rem 0",
						textShadow: "0 0 10px rgba(0, 255, 0, 0.3)",
					}}
				>
					→ Decay Mechanics
				</h1>
				<p style={{ color: "#666666", margin: "0", fontSize: "0.9rem" }}>
					how n0k rooms live and die
				</p>
			</div>

			{/* Section 1: The Concept */}
			<Section title="The Thermodynamic Model">
				<p>
					Every room is a thermal system. It has a temperature T that represents
					how "alive" it is. It consumes fuel F that burns faster when the room
					is hot. When temperature falls below a death threshold, the room
					archives forever.
				</p>
				<CodeBox>
					{`// Core equation
dT/dt = -k_eff(t) · (T - T_death) + F · Σ[heat from messages]
dF/dt = -γ · T

// Heat per message decreases with spam
φ(m_i) = 1 / (1 + α · m_i)
      where m_i = your messages in last 60 seconds`}
				</CodeBox>
				<p style={{ marginTop: "1rem" }}>
					Think of it like a campfire: messages are wood, fuel is oxygen, and
					temperature is the flames. More activity = more heat. Heat burns fuel
					faster. Eventually, even the hottest conversations cool down.
				</p>
			</Section>

			{/* Section 2: Variables */}
			<Section title="The Variables">
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
					<Variable
						symbol="T"
						name="Temperature"
						desc="Room liveliness. Higher = hotter. Cools over time."
					/>
					<Variable
						symbol="F"
						name="Fuel"
						desc="FU units. Starts at 100. Burns proportional to T."
					/>
					<Variable
						symbol="k_eff"
						name="Cooling Rate"
						desc="How fast room loses heat. Increases during peak platform activity."
					/>
					<Variable
						symbol="T_death"
						name="Death Threshold"
						desc="Fixed floor (~1K). Room archives when T drops below this."
					/>
					<Variable
						symbol="h"
						name="Heat per Message"
						desc="How much each message warms the room (max)."
					/>
					<Variable
						symbol="γ"
						name="Fuel Drain"
						desc="How fast fuel burns at peak temperature."
					/>
				</div>
			</Section>

			{/* Section 3: Temperature Tiers */}
			<Section title="Room Status Tiers">
				<p>
					As temperature changes, your room's status shifts. Each tier indicates
					urgency and visual prominence:
				</p>
				<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
					<StatusTier status="INFERNO" temp="T > 400K" color="#ff0000" desc="Wildfire. Burning fuel fast." />
					<StatusTier status="HOT" temp="300K — 400K" color="#ff6600" desc="Very active. Sustained conversation." />
					<StatusTier status="ACTIVE" temp="150K — 300K" color="#00ff00" desc="Healthy. Room is alive and stable." />
					<StatusTier status="COOLING" temp="50K — 150K" color="#ffff00" desc="Activity dropping. Fuel burning slower." />
					<StatusTier status="CRITICAL" temp="T_death — 50K" color="#ff0000" desc="Near death. Minutes remaining." />
					<StatusTier status="DEAD" temp="T ≤ T_death" color="#333333" desc="Archived forever. Game over." />
				</div>
			</Section>

			{/* Section 4: Fuel System */}
			<Section title="Fuel: The Life Force">
				<p>
					Fuel is what your room consumes to keep existing. It starts at 100 FU
					and burns faster when the room is hot.
				</p>
				<HighlightBox>
					<strong>Key mechanics:</strong>
					<ul style={{ marginTop: "0.5rem" }}>
						<li>Starts at 100 FU per new room</li>
						<li>No upper cap — you can inject more via platform tokens (paid)</li>
						<li>Burn rate = γ · T (hotter rooms burn faster)</li>
						<li>
							Display shows: current FU, drain rate (FU/hr), time to death at
							current rate
						</li>
					</ul>
				</HighlightBox>
				<p style={{ marginTop: "1rem" }}>
					A room with 0 activity burns fuel slowly (k_base only). A room with
					thousands of msgs/sec burns through fuel in minutes.
				</p>
			</Section>

			{/* Section 5: Grace Period */}
			<Section title="Cold-Start Grace Period">
				<p>
					When you create a room, it enters a <strong>one-time grace period</strong>{" "}
					(3–5 minutes). During this time, cooling is frozen — temperature stays
					locked and you have time to gather initial participants.
				</p>
				<HighlightBox>
					<strong>Grace period ends when:</strong>
					<ul style={{ marginTop: "0.5rem" }}>
						<li>The first message is sent (immediately)</li>
						<li>OR the timer expires (whichever comes first)</li>
					</ul>
					<p style={{ marginTop: "0.75rem", color: "#ffff00" }}>
						⚠️ It's not replenishable and cannot be extended.
					</p>
				</HighlightBox>
			</Section>

			{/* Section 6: Per-User Diminishing Returns */}
			<Section title="Spam Resistance: Your Message Heat Decays">
				<p>
					To prevent spam and encourage diverse participation, your messages add
					less heat the more you talk.
				</p>
				<CodeBox>
					{`// Each user has a 60-second rolling message count
φ(m_i) = 1 / (1 + 0.3 · m_i)

// Examples:
1st msg in 60s → full heat h         [φ = 1.0]
3rd msg in 60s → 77% of heat h       [φ ≈ 0.77]
5th msg in 60s → 60% of heat h       [φ ≈ 0.6]
10th msg in 60s → 33% of heat h      [φ ≈ 0.33]`}
				</CodeBox>
				<p style={{ marginTop: "1rem" }}>
					User A spamming does not hurt User B's message heat. Each person is
					judged independently. This encourages balanced discourse without
					silencing anyone.
				</p>
			</Section>

			{/* Section 7: Platform Pulse */}
			<Section title="Platform Pulse: Global Cooling Feedback">
				<p>
					A global metric tracks platform-wide activity (5-min rolling average
					in messages/min). During peak hours, all rooms cool faster. This
					couples individual rooms to the platform's collective energy.
				</p>
				<HighlightBox>
					<strong>Formula:</strong>
					<CodeBox>
						{`k_eff(t) = k_base · (1 + β · P_norm(t))

where P_norm(t) ∈ [0, 1] is normalized platform pulse
β ≈ 0.5 to 1.0 means peak hours increase cooling 50–100%`}
					</CodeBox>
					<p style={{ marginTop: "0.75rem" }}>
						<strong>Display:</strong> Always visible in the main layout.{" "}
						<code>Platform Pulse: 847 msg/min · Cooling: 1.4× · 62 live rooms</code>
					</p>
				</HighlightBox>
			</Section>

			{/* Section 8: Milestone Fuel Injection */}
			<Section title="Milestone Rewards: Collective Fuel Bonuses">
				<p>
					Rooms with diverse, sustained participation get surprise fuel injections.
					This rewards real conversation over bot spam.
				</p>
				<HighlightBox>
					<strong>Milestones fire when ALL three conditions are met:</strong>
					<ol style={{ marginTop: "0.5rem" }}>
						<li>
							At least N distinct users have sent ≥1 message (e.g., N=10, 25, 50)
						</li>
						<li>
							No single user accounts for more than X% of total messages (e.g.,
							&lt;40%, &lt;30%, &lt;25%)
						</li>
						<li>
							The N unique senders were achieved over at least W minutes (e.g.,
							5min, 15min, 30min)
						</li>
					</ol>
					<p style={{ marginTop: "0.75rem" }}>
						<strong>Rewards:</strong> +5 FU (10 users), +10 FU (25 users), +15 FU
						(50 users)
					</p>
				</HighlightBox>
			</Section>

			{/* Section 9: Example Decay Curves */}
			<Section title="Example Decay Curves">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1.5rem",
						marginTop: "1rem",
					}}
				>
					<ExampleCurve
						title="Silent Room"
						desc="No messages"
						output="Archives in ~2–3 hours"
					/>
					<ExampleCurve
						title="Slow Chat"
						desc="Few msgs/hr"
						output="Lives 12–48 hours"
					/>
					<ExampleCurve
						title="Normal Activity"
						desc="Moderate msgs/min"
						output="Sustains indefinitely"
					/>
					<ExampleCurve
						title="Inferno"
						desc="Thousands msgs/min"
						output="Burns through 100 FU in minutes"
					/>
				</div>
			</Section>

			{/* Section 10: Transparency & Display */}
			<Section title="Complete Transparency">
				<p>
					n0k shows you every variable. No hidden timers, no mystery mechanics.
					You see:
				</p>
				<ul
					style={{
						marginTop: "1rem",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1rem",
					}}
				>
					<li>✓ Current temperature (T)</li>
					<li>✓ Fuel remaining (FU)</li>
					<li>✓ Drain rate (FU/hr)</li>
					<li>✓ Time to death at current rate</li>
					<li>✓ Room status tier</li>
					<li>✓ Your personal message heat cost</li>
					<li>✓ Platform-wide pulse & cooling multiplier</li>
					<li>✓ Death threshold (T_death)</li>
				</ul>
				<p style={{ marginTop: "1.5rem" }}>
					System broadcasts surface model state as narrative events in the chat
					stream. No pop-ups, no notifications—just the truth embedded in the
					conversation.
				</p>
			</Section>

			{/* Footer CTA */}
			<div
				style={{
					marginTop: "4rem",
					paddingTop: "2rem",
					borderTop: "1px solid #00ff0033",
					textAlign: "center",
				}}
			>
				<p style={{ margin: "0 0 1rem 0" }}>Ready to watch your room burn?</p>
				<Link to="/app">
					<button
						is-="button"
						style={{
							backgroundColor: "#00ff00",
							color: "#000000",
							padding: "0.75rem 2rem",
							border: "none",
							fontFamily: "monospace",
							fontWeight: "bold",
							cursor: "pointer",
							fontSize: "1rem",
						}}
					>
						→ Create a Room
					</button>
				</Link>
			</div>
		</main>
	);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section style={{ marginBottom: "2.5rem" }}>
			<h2
				style={{
					color: "#00ff00",
					fontSize: "1.2rem",
					margin: "0 0 1rem 0",
					borderBottom: "1px solid #00ff0055",
					paddingBottom: "0.5rem",
				}}
			>
				{title}
			</h2>
			<div style={{ color: "#aaaaaa" }}>{children}</div>
		</section>
	);
}

function CodeBox({ children }: { children: string }) {
	return (
		<pre
			style={{
				backgroundColor: "#0a0a0a",
				border: "1px solid #00ff0033",
				padding: "1rem",
				borderRadius: "4px",
				overflow: "auto",
				fontSize: "0.85rem",
				lineHeight: "1.5",
				color: "#00ff00",
				margin: "1rem 0",
			}}
		>
			{children}
		</pre>
	);
}

function HighlightBox({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				backgroundColor: "rgba(0, 255, 0, 0.05)",
				border: "1px solid #00ff0055",
				padding: "1rem",
				borderRadius: "4px",
				margin: "1rem 0",
			}}
		>
			{children}
		</div>
	);
}

function Variable({
	symbol,
	name,
	desc,
}: {
	symbol: string;
	name: string;
	desc: string;
}) {
	return (
		<div
			style={{
				padding: "1rem",
				backgroundColor: "rgba(0, 255, 0, 0.03)",
				border: "1px solid #00ff0033",
				borderLeft: "3px solid #00ff00",
			}}
		>
			<div style={{ color: "#00ff00", fontWeight: "bold", fontSize: "1.1rem" }}>
				{symbol}
			</div>
			<div style={{ color: "#00ff00", fontSize: "0.9rem", marginTop: "0.25rem" }}>
				{name}
			</div>
			<div style={{ color: "#888888", fontSize: "0.85rem", marginTop: "0.5rem" }}>
				{desc}
			</div>
		</div>
	);
}

function StatusTier({
	status,
	temp,
	color,
	desc,
}: {
	status: string;
	temp: string;
	color: string;
	desc: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				gap: "1rem",
				padding: "0.75rem 1rem",
				backgroundColor: "rgba(0, 0, 0, 0.3)",
				border: `1px solid ${color}33`,
				borderLeft: `3px solid ${color}`,
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "12px",
					height: "12px",
					backgroundColor: color,
					borderRadius: "2px",
				}}
			/>
			<div style={{ flex: 1 }}>
				<div style={{ color: color, fontWeight: "bold" }}>
					{status} <span style={{ color: "#666666", fontWeight: "normal" }}>({temp})</span>
				</div>
				<div style={{ color: "#888888", fontSize: "0.85rem", marginTop: "0.25rem" }}>
					{desc}
				</div>
			</div>
		</div>
	);
}

function ExampleCurve({
	title,
	desc,
	output,
}: {
	title: string;
	desc: string;
	output: string;
}) {
	return (
		<div
			style={{
				padding: "1rem",
				border: "1px solid #00ff0055",
				backgroundColor: "rgba(0, 255, 0, 0.03)",
			}}
		>
			<div style={{ color: "#00ff00", fontWeight: "bold" }}>{title}</div>
			<div style={{ color: "#888888", fontSize: "0.85rem", marginTop: "0.25rem" }}>
				{desc}
			</div>
			<div
				style={{
					color: "#ffff00",
					fontSize: "0.9rem",
					marginTop: "0.75rem",
					fontWeight: "bold",
				}}
			>
				→ {output}
			</div>
		</div>
	);
}
