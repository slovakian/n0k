import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	fallback: ReactNode;
};

type State = { error: Error | null };

export class HomepageErrorBoundary extends Component<Props, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	override componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Homepage rooms error:", error, info.componentStack);
	}

	override render() {
		if (this.state.error) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}
