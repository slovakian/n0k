export type ServerMessage =
	| { type: "history"; messages: StoredMessage[] }
	| { type: "message"; message: StoredMessage };

export type ClientMessage = {
	type: "message";
	author: string;
	content: string;
};

export interface StoredMessage {
	id: string;
	author: string;
	content: string;
	timestamp: number;
	msgType: "user" | "system";
}
