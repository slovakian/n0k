import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Homepage,
});

function Homepage() {
	return (
		<main
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100dvh",
				padding: "2rem 1rem",
				gap: "2rem",
			}}
		>
			{/* ASCII Art Header */}
			<div style={{ textAlign: "center", fontFamily: "monospace" }}>
				<pre
					style={{
						fontSize: "0.9rem",
						margin: "0",
						color: "#00ff00",
						textShadow: "0 0 10px rgba(0, 255, 0, 0.3)",
						lineHeight: "1",
						whiteSpace: "pre",
					}}
				>
					{`
    ███╗   ██╗ ██████╗ ██╗  ██╗
    ████╗  ██║██╔═══██╗██║ ██╔╝
    ██╔██╗ ██║██║   ██║█████╔╝
    ██║╚██╗██║██║   ██║██╔═██╗
    ██║ ╚████║╚██████╔╝██║  ██╗
    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝
					`}
				</pre>
			</div>

			{/* Main Content Box */}
			<div
				box-="square"
				style={{
					maxWidth: "600px",
					width: "100%",
					padding: "2rem",
					border: "2px solid #00ff00",
					backgroundColor: "rgba(0, 255, 0, 0.02)",
				}}
			>
				{/* Tagline */}
				<h2
					style={{
						margin: "0 0 1rem 0",
						color: "#00ff00",
						fontSize: "1.2rem",
						fontFamily: "monospace",
						fontWeight: "bold",
					}}
				>
					$ ephemeral chat rooms
				</h2>

				<p
					style={{
						margin: "0 0 1.5rem 0",
						color: "#aaaaaa",
						fontFamily: "monospace",
						fontSize: "0.95rem",
						lineHeight: "1.6",
					}}
				>
					Chat rooms governed by thermodynamics. Every message adds heat. Every
					moment burns fuel. Keep talking or watch your room cool to oblivion.
					Ephemeral by design, persistent by conversation.
				</p>

				{/* Feature Grid */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1rem",
						margin: "1.5rem 0",
					}}
				>
					<Feature icon="⚡" label="Real-time" />
					<Feature icon="⏱️" label="Ephemeral" />
					<Feature icon="🔌" label="Live" />
					<Feature icon="💬" label="Decentralized" />
				</div>

				{/* Separator */}
				<hr
					style={{
						border: "none",
						borderTop: "1px solid #00ff0033",
						margin: "2rem 0",
					}}
				/>

				{/* CTA Buttons */}
				<div
					style={{
						display: "flex",
						gap: "1rem",
						justifyContent: "center",
						flexWrap: "wrap",
					}}
				>
					<Link to="/app">
						<button
							type="button"
							is-="button"
							style={{
								backgroundColor: "#00ff00",
								color: "#000000",
								padding: "0.75rem 1.5rem",
								border: "none",
								fontFamily: "monospace",
								fontWeight: "bold",
								cursor: "pointer",
								fontSize: "0.95rem",
								transition: "all 0.2s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.boxShadow =
									"0 0 15px rgba(0, 255, 0, 0.6)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.boxShadow = "none";
							}}
						>
							→ Enter
						</button>
					</Link>
					<Link to="/mechanics">
						<button
							type="button"
							is-="button"
							style={{
								backgroundColor: "transparent",
								color: "#00ff00",
								padding: "0.75rem 1.5rem",
								border: "2px solid #00ff00",
								fontFamily: "monospace",
								fontWeight: "bold",
								cursor: "pointer",
								fontSize: "0.95rem",
								transition: "all 0.2s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "transparent";
							}}
						>
							how it works
						</button>
					</Link>
				</div>
			</div>

			{/* Terminal Footer */}
			<div
				style={{
					color: "#555555",
					fontFamily: "monospace",
					fontSize: "0.85rem",
					marginTop: "2rem",
					textAlign: "center",
				}}
			>
				<p style={{ margin: "0.5rem 0" }}>
					n0k v0.1.0 • powered by thermodynamics
				</p>
				<p style={{ margin: "0.5rem 0", color: "#333333" }}>
					$ terminal chat rooms for the ephemeral age
				</p>
			</div>
		</main>
	);
}

function Feature({ icon, label }: { icon: string; label: string }) {
	return (
		<div
			style={{
				padding: "1rem",
				borderLeft: "2px solid #00ff0055",
				color: "#aaaaaa",
				fontFamily: "monospace",
				fontSize: "0.9rem",
			}}
		>
			<div
				style={{ color: "#00ff00", fontSize: "1.5rem", marginBottom: "0.5rem" }}
			>
				{icon}
			</div>
			<div style={{ color: "#00ff00" }}>{label}</div>
		</div>
	);
}
