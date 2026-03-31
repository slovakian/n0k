import { create } from "zustand";

export interface ChatMessage {
	id: string;
	author: string;
	content: string;
	timestamp: number;
	type: "user" | "system";
}

type NewChatMessage = Pick<ChatMessage, "author" | "content" | "type"> &
	Partial<Pick<ChatMessage, "id" | "timestamp">>;

interface ChatStore {
	messages: ChatMessage[];
	addMessage: (message: NewChatMessage) => void;
	clearMessages: () => void;
	setMessages: (messages: ChatMessage[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
	messages: [],
	addMessage: (message) =>
		set((state) => ({
			messages: [
				...state.messages,
				{
					author: message.author,
					content: message.content,
					type: message.type,
					id: message.id ?? crypto.randomUUID(),
					timestamp: message.timestamp ?? Date.now(),
				},
			],
		})),
	clearMessages: () => set({ messages: [] }),
	setMessages: (messages) => set({ messages }),
}));
