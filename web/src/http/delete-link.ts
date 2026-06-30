import { api } from "@/lib/ky";

type DeleteLinkRequest = {
	shortenedUrl: string;
};

export async function deleteLink({ shortenedUrl }: DeleteLinkRequest) {
	await api.delete(`/links/${shortenedUrl}`);
}
