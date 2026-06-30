import { api } from "@/lib/ky";

export async function incrementLinkAccess(shortenedUrl: string) {
	await api.patch(`/links/${shortenedUrl}/access`);
}
