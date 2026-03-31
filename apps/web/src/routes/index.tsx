import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { forwardRef, Suspense, useRef, useState } from "react";
import { createRoomServerFn } from "@/data/rooms/fns/create";
import { refreshRoomsCollection } from "@/data/utils";
import { authClient } from "@/features/auth/client";
import { ThemeSelector } from "@/features/themes/theme-selector";
import { HomepageErrorBoundary } from "./-components/homepage-error-boundary";
import { HomepageRoomsTable } from "./-components/homepage-rooms-table";
import "./index.css";

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
		<main className="homepage">
			<div className="homepage__top">
				<div className="homepage__brand">
					<h1 className="homepage__title">n0k: anonymous chat rooms</h1>
					<pre className="homepage__ascii" aria-hidden>
						{`
    ███╗   ██╗ ██████╗ ██╗  ██╗
    ████╗  ██║██╔═══██╗██║ ██╔╝
    ██╔██╗ ██║██║   ██║█████╔╝
    ██║╚██╗██║██║   ██║██╔═██╗
    ██║ ╚████║╚██████╔╝██║  ██╗
    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝`}
					</pre>
					<p className="homepage__pitch">
						No accounts, no passwords. Pick a room or create one and you're in.
						Each space is anonymous and real time, with a terminal style face.
						Rooms don't last forever: their lifespan follows a thermodynamic
						rhythm. They warm with the chat, hold while people are there, then
						go quiet. Nothing here pretends to be permanent.
					</p>
					<ul className="homepage__tags" aria-label="Highlights">
						<li>anonymous</li>
						<li>no signup</li>
						<li>real time</li>
						<li>ephemeral</li>
						<li>terminal style</li>
					</ul>
				</div>
				<div className="homepage__actions">
					<button type="button" is-="button" onClick={openDialog}>
						create room
					</button>
					<Link to="/mechanics" is-="button">
						how it works
					</Link>
				</div>
			</div>

			<div className="homepage__panel" box-="square">
				<HomepageErrorBoundary
					fallback={
						<p className="homepage__table-error">
							Could not load the room list. Check your connection and reload.
						</p>
					}
				>
					<Suspense
						fallback={
							<div className="homepage__table-suspense" aria-busy="true">
								<span is-="spinner" variant-="dots" speed-="medium" />
								syncing room index…
							</div>
						}
					>
						<HomepageRoomsTable />
					</Suspense>
				</HomepageErrorBoundary>
			</div>

			<section className="homepage__status" aria-label="Status">
				<div className="homepage__status-left">
					<span className="homepage__status-app">[n0k]</span>
					<span className="homepage__status-sep">·</span>
					<span className="homepage__status-ctx">home</span>
				</div>
				<div className="homepage__status-right">
					<ThemeSelector />
				</div>
			</section>

			<footer className="homepage__footer">
				<p style={{ margin: "0.25lh 0" }}>n0k v0.1.0</p>
				<p style={{ margin: "0.25lh 0" }}>
					made by{" "}
					<a
						href="https://procka.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Jason Procka (procka.org)
					</a>
				</p>
			</footer>

			<CreateRoomDialog ref={dialogRef} onCreated={handleCreated} />
		</main>
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
			setError("Only letters, numbers, underscores, and minus signs");
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
			const { id } = await createRoom({
				data: { name, description: description || undefined },
			});
			setName("");
			setDescription("");
			await refreshRoomsCollection();
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
			className="homepage-dialog"
			position-="center"
			size-="small"
			style={{ fontFamily: "var(--font-family, monospace)" }}
		>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "1rem" }}>
					<strong>$ new room</strong>
				</div>
				<p className="homepage-dialog__hint">
					Give your room a name using letters, numbers, underscores, and minus
					signs between segments if you like.
				</p>
				<div style={{ marginBottom: "1rem" }}>
					<label htmlFor="room-name" className="homepage-dialog__label">
						room name
					</label>
					<input
						id="room-name"
						is-="input"
						type="text"
						placeholder="my_room"
						value={name}
						onChange={(e) => handleNameChange(e.target.value)}
						autoFocus
						style={{ width: "100%", boxSizing: "border-box" }}
					/>
					{error ? <p className="homepage-dialog__error">{error}</p> : null}
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<label htmlFor="room-description" className="homepage-dialog__label">
						description <span className="homepage-dialog__opt">(optional)</span>
					</label>
					<textarea
						id="room-description"
						is-="input"
						placeholder="what is this room about?"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						maxLength={280}
						style={{
							width: "100%",
							boxSizing: "border-box",
							resize: "vertical",
						}}
					/>
					<p className="homepage-dialog__counter">{description.length}/280</p>
				</div>
				<div className="homepage-dialog__actions">
					<button type="button" is-="button" onClick={handleClose}>
						cancel
					</button>
					<button
						type="submit"
						is-="button"
						disabled={!name || !!error || loading}
						className="homepage-dialog__submit homepage-dialog__submit--primary"
					>
						{loading ? (
							<span
								is-="spinner"
								variant-="dots"
								speed-="medium"
								style={{
									color: "var(--background0, var(--webtui-background-0))",
								}}
							/>
						) : (
							"create"
						)}
					</button>
				</div>
			</form>
		</dialog>
	);
});
