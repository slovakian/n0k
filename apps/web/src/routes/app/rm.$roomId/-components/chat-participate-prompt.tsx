import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { authClient } from "@/features/auth/client";
import { authQueryOptions } from "@/features/auth/query";
import "./chat-participate-prompt.css";

export function ChatSessionPending() {
	return (
		<div className="chat-auth-pending" aria-busy="true">
			Loading session…
		</div>
	);
}

export function ChatParticipatePrompt() {
	const queryClient = useQueryClient();
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	async function handleParticipate() {
		setBusy(true);
		setError("");
		try {
			const { error: signError } = await authClient.signIn.anonymous();
			if (signError) {
				setError(signError.message ?? "Could not start an anonymous session.");
				return;
			}
			await queryClient.invalidateQueries({
				queryKey: authQueryOptions.queryKey,
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="chat-participate-prompt">
			<button
				type="button"
				is-="button"
				className="chat-participate-prompt__action"
				disabled={busy}
				onClick={handleParticipate}
			>
				{busy ? "Signing in…" : "Click to participate anonymously"}
			</button>
			{error ? (
				<span className="chat-participate-prompt__error" role="alert">
					{error}
				</span>
			) : null}
		</div>
	);
}
