import { api } from "@/lib/ky";

type CreateLinkRequest = {
	originalUrl: string;
	shortenedUrl: string;
};

export async function createLink({
	originalUrl,
	shortenedUrl,
}: CreateLinkRequest) {
	await api.post("/links", {
		json: {
			originalUrl,
			shortenedUrl,
		},
	});
}
