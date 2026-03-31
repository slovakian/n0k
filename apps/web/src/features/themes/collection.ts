import { createCollection, localStorageCollectionOptions } from "@tanstack/react-db";

export interface UserPreferences {
	id: "local";
	theme: string;
}

export const userPrefsCollection = createCollection(
	localStorageCollectionOptions<UserPreferences>({
		id: "user-preferences",
		storageKey: "n0k-prefs",
		getKey: (item) => item.id,
	}),
);
