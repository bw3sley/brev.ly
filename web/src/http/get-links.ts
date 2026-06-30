import { api } from "@/lib/ky";

type GetLinksResponse = {
	total: number;
	links: {
		id: string;
		originalUrl: string;
		shortenedUrl: string;
		accessCount: number;
		createdAt: string;
		lastAccessedAt: string;
	}[];
};

export async function getLinks() {
	const data = await api.get("/links").json<GetLinksResponse>();

	return data;
}
