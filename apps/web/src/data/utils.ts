import { roomsCollection } from "./rooms/collections";

export const preloadAppCollections = async () =>
	await Promise.all([roomsCollection.preload()]);

/** Ensures the rooms query exists, then refetches from the server (e.g. after create). */
export async function refreshRoomsCollection() {
	await roomsCollection.preload();
	await roomsCollection.utils.refetch({ throwOnError: true });
}
