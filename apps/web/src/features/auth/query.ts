import {
	queryOptions,
	useQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { authClient } from "./client";

export const authQueryOptions = queryOptions({
	queryKey: ["session"],
	queryFn: async () => {
		const session = await authClient.getSession();
		return session.data;
	},
});

export const useAuth = () => useQuery(authQueryOptions);
/** Same query as `useAuth` — session from `authClient.getSession()`. */
export const useSession = useAuth;
export const useSuspenseAuth = () => useSuspenseQuery(authQueryOptions);
