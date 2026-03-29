import { create } from "zustand";

export interface ChatMessage {
	id: string;
	author: string;
	content: string;
	timestamp: number;
	type: "user" | "system";
}

interface ChatStore {
	messages: ChatMessage[];
	addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
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
					...message,
					id: crypto.randomUUID(),
					timestamp: Date.now(),
				},
			],
		})),
	clearMessages: () => set({ messages: [] }),
	setMessages: (messages) => set({ messages }),
}));
