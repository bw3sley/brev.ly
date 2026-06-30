import { api } from "@/lib/ky";

type GetOriginalUrlByShortenedUrlResponse = {
	originalUrl: string;
};

export async function getOriginalUrlByShortenedUrl(shortenedUrl: string) {
	const data = await api
		.get(`/links/${shortenedUrl}/original-url`)
		.json<GetOriginalUrlByShortenedUrlResponse>();

	return { originalUrl: data.originalUrl };
}
