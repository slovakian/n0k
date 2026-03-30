export default function Loader() {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: "0.5lh",
			}}
		>
			<span
				{...{ "is-": "spinner", "variant-": "dots", "speed-": "medium" }}
				aria-hidden
			/>
			<span style={{ opacity: 0.6 }}>loading...</span>
		</div>
	);
}
