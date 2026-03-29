import handler from "@tanstack/react-start/server-entry";

export { ChatRoom } from "./cloudflare/room/durable-object";

export default {
	fetch: handler.fetch,
};
