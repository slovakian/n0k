export default function Loader() {
	return (
		<p>
			<span {...{ "is-": "spinner" }} aria-hidden />
			{" Loading…"}
		</p>
	);
}
