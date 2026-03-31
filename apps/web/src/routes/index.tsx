import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { forwardRef, useRef, useState } from "react";
import { createRoomServerFn } from "@/data/rooms/fns/create";
import { authClient } from "@/features/auth/client";

export const Route = createFileRoute("/")({
	component: Homepage,
});

function Homepage() {
	const navigate = useNavigate();
	const dialogRef = useRef<HTMLDialogElement>(null);

	function openDialog() {
		dialogRef.current?.showModal();
	}

	function handleCreated(id: string) {
		dialogRef.current?.close();
		navigate({ to: "/app/rm/$roomId", params: { roomId: id } });
	}

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
					<Feature icon="💬" label="Anonymous" />
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
					<button
						type="button"
						is-="button"
						onClick={openDialog}
						style={{
							backgroundColor: "#00ff00",
							color: "#000000",
							padding: "0.75rem 1.5rem",
							border: "none",
							fontFamily: "monospace",
							fontWeight: "bold",
							cursor: "pointer",
							fontSize: "0.95rem",
							transition: "box-shadow 0.2s",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.6)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.boxShadow = "none";
						}}
					>
						→ create room
					</button>
					<Link
						to="/mechanics"
						is-="button"
						style={{
							backgroundColor: "transparent",
							color: "#00ff00",
							padding: "0.75rem 1.5rem",
							border: "2px solid #00ff00",
							fontFamily: "monospace",
							fontWeight: "bold",
							fontSize: "0.95rem",
							transition: "background-color 0.2s",
							textDecoration: "none",
						}}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLElement).style.backgroundColor =
								"rgba(0, 255, 0, 0.1)";
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLElement).style.backgroundColor =
								"transparent";
						}}
					>
						how it works
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
				<p style={{ margin: "0.5rem 0", color: "#444444" }}>
					made by{" "}
					<a
						href="https://procka.org"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "#555555", textDecoration: "underline" }}
					>
						Jason Procka (procka.org)
					</a>
				</p>
			</div>

			<CreateRoomDialog ref={dialogRef} onCreated={handleCreated} />
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

const CreateRoomDialog = forwardRef<
	HTMLDialogElement,
	{ onCreated: (id: string) => void }
>(function CreateRoomDialog({ onCreated }, ref) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const createRoom = useServerFn(createRoomServerFn);

	const URL_SAFE = /^[a-zA-Z0-9_-]*$/;

	function handleNameChange(value: string) {
		setName(value);
		if (value && !URL_SAFE.test(value)) {
			setError("Only letters, numbers, hyphens, and underscores allowed");
		} else if (value.length > 32) {
			setError("Name must be 32 characters or fewer");
		} else {
			setError("");
		}
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!name || error) return;
		setLoading(true);
		try {
			await authClient.signIn.anonymous();
			const { id } = await createRoom({ data: { name, description: description || undefined } });
			setName("");
			setDescription("");
			onCreated(id);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create room");
		} finally {
			setLoading(false);
		}
	}

	function handleClose() {
		setName("");
		setDescription("");
		setError("");
		(ref as React.RefObject<HTMLDialogElement>).current?.close();
	}

	return (
		<dialog
			ref={ref}
			position-="center"
			size-="small"
			style={{ fontFamily: "monospace" }}
		>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "1rem" }}>
					<strong style={{ color: "#00ff00" }}>$ new room</strong>
				</div>
				<p style={{ margin: "0 0 1rem 0", color: "#aaaaaa", fontSize: "0.9rem" }}>
					Give your room a name. Letters, numbers, hyphens, and underscores only.
				</p>
				<div style={{ marginBottom: "1rem" }}>
					<label
						htmlFor="room-name"
						style={{ display: "block", marginBottom: "0.4rem", color: "#aaaaaa", fontSize: "0.85rem" }}
					>
						room name
					</label>
					<input
						id="room-name"
						is-="input"
						type="text"
						placeholder="my-room"
						value={name}
						onChange={(e) => handleNameChange(e.target.value)}
						autoFocus
						style={{ width: "100%", boxSizing: "border-box" }}
					/>
					{error && (
						<p style={{ margin: "0.4rem 0 0 0", color: "#ff4444", fontSize: "0.85rem" }}>
							{error}
						</p>
					)}
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<label
						htmlFor="room-description"
						style={{ display: "block", marginBottom: "0.4rem", color: "#aaaaaa", fontSize: "0.85rem" }}
					>
						description <span style={{ color: "#555" }}>(optional)</span>
					</label>
					<textarea
						id="room-description"
						is-="input"
						placeholder="what is this room about?"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						maxLength={280}
						style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }}
					/>
					<p style={{ margin: "0.25rem 0 0 0", color: "#555", fontSize: "0.8rem", textAlign: "right" }}>
						{description.length}/280
					</p>
				</div>
				<div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
					<button
						type="button"
						is-="button"
						onClick={handleClose}
						style={{ fontFamily: "monospace" }}
					>
						cancel
					</button>
					<button
						type="submit"
						is-="button"
						disabled={!name || !!error || loading}
						style={{
							fontFamily: "monospace",
							backgroundColor: "#00ff00",
							color: "#000",
							opacity: !name || !!error || loading ? 0.5 : 1,
							cursor: !name || !!error || loading ? "not-allowed" : "pointer",
						}}
					>
						{loading ? (
							<span is-="spinner" variant-="dots" speed-="medium" style={{ color: "#000" }} />
						) : (
							"create"
						)}
					</button>
				</div>
			</form>
		</dialog>
	);
});
